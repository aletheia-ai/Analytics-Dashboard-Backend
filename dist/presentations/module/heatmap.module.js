"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatMapsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const heatmap_schema_1 = require("../../infrastructure/modal/heatmap.schema");
const socket_module_1 = require("./socket.module");
const heat_maps_controller_1 = require("../controller/heat-maps.controller");
const heatmap_service_1 = require("../service/heatmap.service");
const redis_module_1 = require("../../utils/shared/redis/redis.module");
const queue_worker_service_1 = require("../service/queue-worker.service");
let HeatMapsModule = class HeatMapsModule {
};
exports.HeatMapsModule = HeatMapsModule;
exports.HeatMapsModule = HeatMapsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Heat_Maps', schema: heatmap_schema_1.HeatmapItemSchema }]),
            redis_module_1.RedisModule,
            socket_module_1.SocketModule,
        ],
        controllers: [heat_maps_controller_1.HeatmapController],
        providers: [heatmap_service_1.HeatmapService, queue_worker_service_1.HeatmapStreamWorker],
        exports: [mongoose_1.MongooseModule],
    })
], HeatMapsModule);
//# sourceMappingURL=heatmap.module.js.map