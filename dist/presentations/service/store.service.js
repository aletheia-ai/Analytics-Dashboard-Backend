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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let StoreService = class StoreService {
    store;
    company;
    region;
    constructor(store, company, region) {
        this.store = store;
        this.company = company;
        this.region = region;
    }
    async addNewStore(storeData, id) {
        try {
            const { company, region } = storeData;
            const userId = id;
            const companyData = await this.company.findById(company).exec();
            if (companyData) {
                if (companyData.user.toString() === userId.toString()) {
                    const regionData = await this.region.findById(region).exec();
                    if (regionData) {
                        const existingStore = await this.store.findOne({ name: storeData.name });
                        if (!existingStore) {
                            const store = new this.store({ ...storeData });
                            await store.save();
                            return { success: true };
                        }
                        else {
                            return { success: false, error: 409 };
                        }
                    }
                    else {
                        return { success: false, error: 404 };
                    }
                }
                return { success: false, error: 403 };
            }
            else {
                return { success: false, error: 404 };
            }
        }
        catch (error) {
            return { success: false, error: error.code || 500 };
        }
    }
    async getAllStores(companyId) {
        try {
            const companyData = await this.company.findById(companyId);
            if (!companyData) {
                return { success: false, error: 404, errorFrom: 'Company' };
            }
            else {
                const storeData = await this.store.find({ company: companyId });
                if (!storeData) {
                    return { success: false, error: 404, errorFrom: 'Store' };
                }
                else {
                    return { success: true, data: storeData };
                }
            }
        }
        catch (error) {
            return { success: false, error: error.code || 500, errorFrom: 'Store' };
        }
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Store')),
    __param(1, (0, mongoose_1.InjectModel)('Company')),
    __param(2, (0, mongoose_1.InjectModel)('Region')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StoreService);
//# sourceMappingURL=store.service.js.map