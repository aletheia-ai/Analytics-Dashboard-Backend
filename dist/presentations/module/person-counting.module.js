"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCountingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const person_counting_controller_1 = require("../controller/person-counting.controller");
const person_counting_service_1 = require("../service/person-counting.service");
const person_counting_schema_1 = require("../../infrastructure/modal/person-counting.schema");
const store_module_1 = require("./store.module");
const stats_module_1 = require("./stats.module");
const socket_1 = require("../../utils/shared/socket");
const day_wise_stats_module_1 = require("./day-wise-stats.module");
const hour_stat_module_1 = require("./hour-stat.module");
let PersonCountingModule = class PersonCountingModule {
};
exports.PersonCountingModule = PersonCountingModule;
exports.PersonCountingModule = PersonCountingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Person_Counting', schema: person_counting_schema_1.PersonCountingSchema }]),
            store_module_1.StoreModule,
            stats_module_1.StatsModule,
            day_wise_stats_module_1.DayWiseStatsModule,
            hour_stat_module_1.HourWiseStatsModule,
        ],
        providers: [person_counting_service_1.PersonCountingService, socket_1.AppGateway],
        controllers: [person_counting_controller_1.PersonCountingController],
        exports: [mongoose_1.MongooseModule],
    })
], PersonCountingModule);
//# sourceMappingURL=person-counting.module.js.map