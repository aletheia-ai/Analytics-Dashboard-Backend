"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_service_1 = require("../../applications/use-case/app.service");
const app_controller_1 = require("../controller/app.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user.module");
const auth_module_1 = require("./auth.module");
const region_module_1 = require("./region.module");
const person_counting_module_1 = require("./person-counting.module");
const store_module_1 = require("./store.module");
const company_module_1 = require("./company.module");
const redis_module_1 = require("../../utils/shared/redis/redis.module");
const socket_1 = require("../../utils/shared/socket");
const stats_module_1 = require("./stats.module");
const day_wise_stats_module_1 = require("./day-wise-stats.module");
const hour_stat_module_1 = require("./hour-stat.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    uri: configService.get('MONGO_URL'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            redis_module_1.RedisModule,
            person_counting_module_1.PersonCountingModule,
            region_module_1.RegionModule,
            store_module_1.StoreModule,
            company_module_1.CompanyModule,
            stats_module_1.StatsModule,
            day_wise_stats_module_1.DayWiseStatsModule,
            hour_stat_module_1.HourWiseStatsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, socket_1.AppGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map