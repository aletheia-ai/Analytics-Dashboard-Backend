"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const logs_schema_1 = require("../../infrastructure/modal/logs.schema");
const log_service_1 = require("../service/log.service");
const log_controller_1 = require("../controller/log.controller");
const socket_1 = require("../../utils/shared/socket");
let LogModule = class LogModule {
};
exports.LogModule = LogModule;
exports.LogModule = LogModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Log', schema: logs_schema_1.logSchema }])],
        providers: [log_service_1.LogService, socket_1.AppGateway],
        controllers: [log_controller_1.LogController],
        exports: [mongoose_1.MongooseModule],
    })
], LogModule);
//# sourceMappingURL=logs.module.js.map