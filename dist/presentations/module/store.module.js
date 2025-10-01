"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const store_schema_1 = require("../../infrastructure/modal/store-schema");
const store_service_1 = require("../service/store.service");
const store_controller_1 = require("../controller/store.controller");
const company_module_1 = require("./company.module");
const region_module_1 = require("./region.module");
const day_wise_stats_module_1 = require("./day-wise-stats.module");
const hour_stat_module_1 = require("./hour-stat.module");
let StoreModule = class StoreModule {
};
exports.StoreModule = StoreModule;
exports.StoreModule = StoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Store', schema: store_schema_1.StoreSchema }]),
            company_module_1.CompanyModule,
            region_module_1.RegionModule,
            day_wise_stats_module_1.DayWiseStatsModule,
            hour_stat_module_1.HourWiseStatsModule,
        ],
        providers: [store_service_1.StoreService],
        controllers: [store_controller_1.StoreController],
        exports: [mongoose_1.MongooseModule],
    })
], StoreModule);
//# sourceMappingURL=store.module.js.map