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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const socket_1 = require("../../utils/shared/socket");
const mongoose_2 = require("mongoose");
let LogService = class LogService {
    log;
    appGateway;
    constructor(log, appGateway) {
        this.log = log;
        this.appGateway = appGateway;
    }
    async addLogs(obj) {
        try {
            await this.log.updateOne({ label: obj.label }, { $set: { ...obj } }, { upsert: true });
            this.appGateway.handleProductStats(obj, 'abc');
            return { success: true };
        }
        catch (err) {
            return { success: false };
        }
    }
    async getRecentLogs() {
        try {
            const data = await this.log.find();
            if (data) {
                return { success: true, data };
            }
            else {
                return { success: false, error: 404 };
            }
        }
        catch {
            return { success: false, error: 500 };
        }
    }
};
exports.LogService = LogService;
exports.LogService = LogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Log')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        socket_1.AppGateway])
], LogService);
//# sourceMappingURL=log.service.js.map