"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranAnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const restaurant_analytics_schema_1 = require("../../infrastructure/modal/restaurant-analytics.schema");
const restaurant_analytics_service_1 = require("../service/restaurant-analytics.service");
const restaurant_analytics_controller_1 = require("../controller/restaurant.analytics.controller");
const store_module_1 = require("./store.module");
let RestauranAnalyticsModule = class RestauranAnalyticsModule {
};
exports.RestauranAnalyticsModule = RestauranAnalyticsModule;
exports.RestauranAnalyticsModule = RestauranAnalyticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Restaurant-Analytics', schema: restaurant_analytics_schema_1.RestaurantAnalyticsSchema },
            ]),
            store_module_1.StoreModule,
        ],
        providers: [restaurant_analytics_service_1.RestaurantAnalyticsService],
        controllers: [restaurant_analytics_controller_1.RestaurantAnalyticsController],
        exports: [mongoose_1.MongooseModule],
    })
], RestauranAnalyticsModule);
//# sourceMappingURL=restaurant-analytics.module.js.map