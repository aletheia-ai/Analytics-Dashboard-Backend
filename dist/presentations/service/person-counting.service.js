"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCountingService = void 0;
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const socket_1 = require("../../utils/shared/socket");
const range_type_1 = require("../../utils/types/range-type");
const aggregated_stats_1 = require("../../utils/methods/aggregated-stats");
dotenv.config();
let PersonCountingService = class PersonCountingService {
    personCounting;
    store;
    stats;
    dayWiseStats;
    hourWiseStats;
    appGateway;
    constructor(personCounting, store, stats, dayWiseStats, hourWiseStats, appGateway) {
        this.personCounting = personCounting;
        this.store = store;
        this.stats = stats;
        this.dayWiseStats = dayWiseStats;
        this.hourWiseStats = hourWiseStats;
        this.appGateway = appGateway;
    }
    async addEntry(data) {
        try {
            const { store, cameraId, ...rest } = data;
            const storeData = await this.store.find({ _id: new mongoose_2.Types.ObjectId(store) });
            if (storeData) {
                const entryData = new this.personCounting({ ...data });
                const result = await entryData.save();
                if (result) {
                    const incFields = {};
                    const setFields = {};
                    for (const [key, value] of Object.entries(rest)) {
                        if (key === 'liveOccupancy') {
                            setFields[`data.${key}`] = value ?? 0;
                            continue;
                        }
                        if (typeof value === 'number') {
                            incFields[`data.${key}`] = value ?? 0;
                        }
                        else {
                            setFields[`data.${key}`] = value;
                        }
                    }
                    const aggregatedResult = await this.stats.updateOne({ store, cameraId, range: range_type_1.RangeType.ALL_TIME }, {
                        $inc: incFields,
                        $set: {
                            ...setFields,
                            store,
                            'data.store': store,
                            'data.cameraId': cameraId,
                        },
                    }, { upsert: true });
                    if (!aggregatedResult) {
                        return { success: false, error: 400 };
                    }
                    else {
                        const aggregatedAllResult = await this.stats.updateOne({ store, cameraId: 'all', range: range_type_1.RangeType.ALL_TIME }, {
                            $inc: incFields,
                            $set: {
                                ...setFields,
                                store,
                                'data.store': store,
                                'data.cameraId': cameraId,
                            },
                        }, { upsert: true });
                        if (!aggregatedAllResult) {
                            return { success: false, error: 404 };
                        }
                        else {
                            const statsData = await this.stats.findOne({
                                store: new mongoose_2.Types.ObjectId(store),
                                cameraId: 'all',
                            });
                            if (statsData) {
                                this.appGateway.handlePepleStats(result, 'abc');
                                const dayName = entryData.createdAt.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                });
                                const now = new Date();
                                const currentHour = (now.getUTCHours() + 5) % 24;
                                await this.dayWiseStats.updateOne({ store, day: dayName }, {
                                    $inc: incFields,
                                    $set: {
                                        ...setFields,
                                        store,
                                        'data.store': store,
                                        'data.cameraId': cameraId,
                                    },
                                }, { upsert: true });
                                await this.hourWiseStats.updateOne({ store, hour: currentHour }, {
                                    $inc: incFields,
                                    $set: {
                                        ...setFields,
                                        store,
                                        'data.store': store,
                                        'data.cameraId': cameraId,
                                    },
                                }, { upsert: true });
                                return { success: true };
                            }
                            else {
                                return { success: false, error: 404 };
                            }
                        }
                    }
                }
                else {
                    return { success: false, error: 401 };
                }
            }
            else {
                return { success: false, error: 404 };
            }
        }
        catch (err) {
            console.log('err', err.message);
            return { success: false, error: err.code || 500 };
        }
    }
    async getStats(store, range) {
        try {
            const objectIds = store.map((id) => new mongoose_2.Types.ObjectId(id));
            const data = await this.stats
                .find({
                store: { $in: objectIds },
                cameraId: 'all',
                range: range,
            })
                .lean();
            if (data) {
                const result = data.map((item) => item.data);
                const finalResult = (0, aggregated_stats_1.sumObjects)(result);
                return { success: true, data: finalResult };
            }
            else {
                return { success: false, error: 404 };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async getDayWiseStats(store) {
        try {
            const objectIds = store.map((id) => new mongoose_2.Types.ObjectId(id));
            const stats = await this.dayWiseStats.aggregate([
                {
                    $match: { store: { $in: objectIds } },
                },
                {
                    $group: {
                        _id: '$day',
                        store: { $first: '$store' },
                        cameraId: { $first: '$data.cameraId' },
                        enterCount: { $sum: '$data.enterCount' },
                        exitCount: { $sum: '$data.exitCount' },
                        maskCount: { $sum: '$data.maskCount' },
                        unMaskCount: { $sum: '$data.unMaskCount' },
                        maleCount: { $sum: '$data.maleCount' },
                        feMaleCount: { $sum: '$data.feMaleCount' },
                        passingBy: { $sum: '$data.passingBy' },
                        age_0_9_Count: { $sum: '$data.age_0_9_Count' },
                        age_10_18_Count: { $sum: '$data.age_10_18_Count' },
                        age_19_34_Count: { $sum: '$data.age_19_34_Count' },
                        age_35_60_Count: { $sum: '$data.age_35_60_Count' },
                        age_60plus_Count: { $sum: '$data.age_60plus_Count' },
                        interestedCustomers: { $sum: '$data.interestedCustomers' },
                        buyingCustomers: { $sum: '$data.buyingCustomers' },
                        liveOccupancy: { $sum: '$data.liveOccupancy' },
                    },
                },
                {
                    $addFields: {
                        dayOrder: {
                            $switch: {
                                branches: [
                                    { case: { $eq: ['$_id', 'Monday'] }, then: 1 },
                                    { case: { $eq: ['$_id', 'Tuesday'] }, then: 2 },
                                    { case: { $eq: ['$_id', 'Wednesday'] }, then: 3 },
                                    { case: { $eq: ['$_id', 'Thursday'] }, then: 4 },
                                    { case: { $eq: ['$_id', 'Friday'] }, then: 5 },
                                    { case: { $eq: ['$_id', 'Saturday'] }, then: 6 },
                                    { case: { $eq: ['$_id', 'Sunday'] }, then: 7 },
                                ],
                                default: 8,
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        day: '$_id',
                        data: {
                            store: '$store',
                            cameraId: '$cameraId',
                            enterCount: '$enterCount',
                            exitCount: '$exitCount',
                            maskCount: '$maskCount',
                            unMaskCount: '$unMaskCount',
                            maleCount: '$maleCount',
                            feMaleCount: '$feMaleCount',
                            passingBy: '$passingBy',
                            age_0_9_Count: '$age_0_9_Count',
                            age_10_18_Count: '$age_10_18_Count',
                            age_19_34_Count: '$age_19_34_Count',
                            age_35_60_Count: '$age_35_60_Count',
                            age_60plus_Count: '$age_60plus_Count',
                            interestedCustomers: '$interestedCustomers',
                            buyingCustomers: '$buyingCustomers',
                            liveOccupancy: '$liveOccupancy',
                        },
                        dayOrder: 1,
                    },
                },
                { $sort: { dayOrder: 1 } },
            ]);
            return { success: true, data: stats };
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async getHourWiseStats(store) {
        try {
            const objectIds = store.map((id) => new mongoose_2.Types.ObjectId(id));
            const stats = await this.hourWiseStats.aggregate([
                {
                    $match: { store: { $in: objectIds } },
                },
                {
                    $group: {
                        _id: '$hour',
                        store: { $first: '$store' },
                        cameraId: { $first: '$data.cameraId' },
                        enterCount: { $sum: '$data.enterCount' },
                        exitCount: { $sum: '$data.exitCount' },
                        maskCount: { $sum: '$data.maskCount' },
                        unMaskCount: { $sum: '$data.unMaskCount' },
                        maleCount: { $sum: '$data.maleCount' },
                        feMaleCount: { $sum: '$data.feMaleCount' },
                        passingBy: { $sum: '$data.passingBy' },
                        age_0_9_Count: { $sum: '$data.age_0_9_Count' },
                        age_10_18_Count: { $sum: '$data.age_10_18_Count' },
                        age_19_34_Count: { $sum: '$data.age_19_34_Count' },
                        age_35_60_Count: { $sum: '$data.age_35_60_Count' },
                        age_60plus_Count: { $sum: '$data.age_60plus_Count' },
                        interestedCustomers: { $sum: '$data.interestedCustomers' },
                        buyingCustomers: { $sum: '$data.buyingCustomers' },
                        liveOccupancy: { $sum: '$data.liveOccupancy' },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        hour: '$_id',
                        data: {
                            store: '$store',
                            cameraId: '$cameraId',
                            enterCount: '$enterCount',
                            exitCount: '$exitCount',
                            maskCount: '$maskCount',
                            unMaskCount: '$unMaskCount',
                            maleCount: '$maleCount',
                            feMaleCount: '$feMaleCount',
                            passingBy: '$passingBy',
                            age_0_9_Count: '$age_0_9_Count',
                            age_10_18_Count: '$age_10_18_Count',
                            age_19_34_Count: '$age_19_34_Count',
                            age_35_60_Count: '$age_35_60_Count',
                            age_60plus_Count: '$age_60plus_Count',
                            interestedCustomers: '$interestedCustomers',
                            buyingCustomers: '$buyingCustomers',
                            liveOccupancy: '$liveOccupancy',
                        },
                    },
                },
                { $sort: { hour: 1 } },
            ]);
            return { success: true, data: stats };
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async getCurrentHourStats(store) {
        try {
            const now = new Date();
            const currentHour = now.getUTCHours() + 5;
            const objectIds = store.map((id) => new mongoose_2.Types.ObjectId(id));
            const stats = await this.hourWiseStats
                .find({ store: { $in: objectIds }, hour: currentHour })
                .lean();
            if (stats && stats.length > 0) {
                const result = stats.map((item) => item.data);
                const { age_0_9_Count, age_10_18_Count, age_19_34_Count, age_35_60_Count, age_60plus_Count, enterCount, } = (0, aggregated_stats_1.sumObjects)(result);
                return {
                    success: true,
                    data: {
                        age_0_9_Count,
                        age_10_18_Count,
                        age_19_34_Count,
                        age_35_60_Count,
                        age_60plus_Count,
                        enterCount,
                    },
                };
            }
            else {
                return {
                    success: true,
                    data: {
                        age_0_9_Count: 0,
                        age_10_18_Count: 0,
                        age_19_34_Count: 0,
                        age_35_60_Count: 0,
                        age_60plus_Count: 0,
                        enterCount: 0,
                    },
                };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
};
exports.PersonCountingService = PersonCountingService;
exports.PersonCountingService = PersonCountingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Person Counting')),
    __param(1, (0, mongoose_1.InjectModel)('Store')),
    __param(2, (0, mongoose_1.InjectModel)('Product Stats')),
    __param(3, (0, mongoose_1.InjectModel)('Day Wise Stats')),
    __param(4, (0, mongoose_1.InjectModel)('Hour Wise Stats')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        socket_1.AppGateway])
], PersonCountingService);
//# sourceMappingURL=person-counting.service.js.map