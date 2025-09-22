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
dotenv.config();
let PersonCountingService = class PersonCountingService {
    personCounting;
    store;
    stats;
    appGateway;
    constructor(personCounting, store, stats, appGateway) {
        this.personCounting = personCounting;
        this.store = store;
        this.stats = stats;
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
                        if (typeof value === 'number') {
                            incFields[`data.${key}`] = value ?? 0;
                        }
                        else {
                            setFields[`data.${key}`] = value;
                        }
                    }
                    const aggregatedResult = await this.stats.updateOne({ store }, {
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
                        const statsData = await this.stats.findOne({
                            store: new mongoose_2.Types.ObjectId(store),
                        });
                        if (statsData) {
                            this.appGateway.handlePepleStats(statsData.data, 'abc');
                            return { success: true };
                        }
                        else {
                            return { success: false, error: 404 };
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
            return { success: false, error: err.code || 500 };
        }
    }
    async getStats(store) {
        try {
            const data = await this.stats.findOne({ store: new mongoose_2.Types.ObjectId(store) });
            if (data) {
                return { success: true, data: data.data };
            }
            else {
                return { success: false, error: 404 };
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
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        socket_1.AppGateway])
], PersonCountingService);
//# sourceMappingURL=person-counting.service.js.map