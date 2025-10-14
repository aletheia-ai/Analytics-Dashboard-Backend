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
exports.LogController = void 0;
const common_1 = require("@nestjs/common");
const log_service_1 = require("../service/log.service");
const add_logs_dto_1 = require("../dto/logs/add-logs.dto");
let LogController = class LogController {
    logService;
    constructor(logService) {
        this.logService = logService;
    }
    async addLogs(addLogDto) {
        try {
            const { success } = await this.logService.addLogs(addLogDto);
            if (success) {
                return { message: 'Log Added' };
            }
            else {
                throw new common_1.InternalServerErrorException('Something Went Wrong');
            }
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Something Went Wrong');
        }
    }
    async getRecentLogs() {
        try {
            const result = await this.logService.getRecentLogs();
            if (result.success) {
                return { message: result.data };
            }
            else {
                return { message: [] };
            }
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(err.message || 'Something Went Wrong');
        }
    }
};
exports.LogController = LogController;
__decorate([
    (0, common_1.Post)('addLogs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_logs_dto_1.AddLogsDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "addLogs", null);
__decorate([
    (0, common_1.Get)('get-logs'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LogController.prototype, "getRecentLogs", null);
exports.LogController = LogController = __decorate([
    (0, common_1.Controller)('productiondetection'),
    __metadata("design:paramtypes", [log_service_1.LogService])
], LogController);
//# sourceMappingURL=log.controller.js.map