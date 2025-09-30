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
const queue_service_1 = require("../../utils/queue/queue.service");
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
    queue;
    constructor(personCounting, store, stats, dayWiseStats, hourWiseStats, appGateway, queue) {
        this.personCounting = personCounting;
        this.store = store;
        this.stats = stats;
        this.dayWiseStats = dayWiseStats;
        this.hourWiseStats = hourWiseStats;
        this.appGateway = appGateway;
        this.queue = queue;
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
                                this.appGateway.handlePepleStats(statsData.data, 'abc');
                                const dayName = entryData.createdAt.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                });
                                const now = new Date();
                                const currentHour = now.getUTCHours();
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
    async getStats(store) {
        try {
            const objectIds = store.map((id) => new mongoose_2.Types.ObjectId(id));
            const data = await this.stats
                .find({
                store: { $in: objectIds },
                cameraId: 'all',
                range: 'all',
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
            const stats = await this.dayWiseStats.find({ store: store[0] });
            return { success: true, data: stats };
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async getHourWiseStats(store) {
        try {
            const stats = await this.hourWiseStats.find({ store });
            return { success: true, data: stats };
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async getCurrentHourStats(store) {
        try {
            const now = new Date();
            const currentHour = now.getUTCHours();
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
        socket_1.AppGateway,
        queue_service_1.QueueService])
], PersonCountingService);
//# sourceMappingURL=person-counting.service.js.map