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
var RegionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RegionService = RegionService_1 = class RegionService {
    regionModel;
    logger = new common_1.Logger(RegionService_1.name);
    constructor(regionModel) {
        this.regionModel = regionModel;
    }
    async onModuleInit() {
        const count = await this.regionModel.estimatedDocumentCount();
        if (count === 0) {
            this.logger.log('Seeding AWS regions...');
            await this.regionModel.insertMany(this.getAwsRegions());
            this.logger.log('Regions seeded successfully.');
        }
        else {
            this.logger.log('Regions already exist, skipping seeding.');
        }
    }
    getAwsRegions() {
        return [
            { regionId: 1, name: 'us-east-1' },
            { regionId: 2, name: 'us-west-1' },
            { regionId: 3, name: 'us-west-2' },
            { regionId: 4, name: 'eu-west-1' },
            { regionId: 5, name: 'eu-central-1' },
            { regionId: 6, name: 'ap-south-1' },
            { regionId: 7, name: 'ap-northeast-1' },
            { regionId: 8, name: 'ap-southeast-1' },
            { regionId: 9, name: 'ap-southeast-2' },
            { regionId: 10, name: 'sa-east-1' },
        ];
    }
};
exports.RegionService = RegionService;
exports.RegionService = RegionService = RegionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Region')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RegionService);
//# sourceMappingURL=region.service.js.map