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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionController = void 0;
const common_1 = require("@nestjs/common");
const region_service_1 = require("../service/region.service");
const auth_guard_1 = require("../../utils/guards/auth.guard.");
let RegionController = class RegionController {
    regionService;
    constructor(regionService) {
        this.regionService = regionService;
    }
    async getAllRegions() {
        try {
            const result = await this.regionService.getAllRegions();
            if (result.success) {
                return { message: result.data };
            }
            else {
                if (result.error == 404) {
                    throw new common_1.NotFoundException('Regions Found');
                }
                else {
                    throw new common_1.InternalServerErrorException('Something went wrong');
                }
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('Something went wrong');
        }
    }
};
exports.RegionController = RegionController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RegionController.prototype, "getAllRegions", null);
exports.RegionController = RegionController = __decorate([
    (0, common_1.Controller)('region'),
    __metadata("design:paramtypes", [region_service_1.RegionService])
], RegionController);
//# sourceMappingURL=region.controller.js.map