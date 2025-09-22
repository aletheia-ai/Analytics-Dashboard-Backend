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
exports.PersonCountingController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../utils/guards/auth.guard.");
const person_counting_service_1 = require("../service/person-counting.service");
const person_counting_1 = require("../dto/person-counting");
let PersonCountingController = class PersonCountingController {
    personCounting;
    constructor(personCounting) {
        this.personCounting = personCounting;
    }
    async getStatistics(getStatsDto) {
        try {
            const result = await this.personCounting.getStats(getStatsDto.store);
            if (result.success) {
                return { message: result.data };
            }
            else {
                const { error } = result;
                if (error === 404) {
                    throw new common_1.NotFoundException();
                }
                else {
                    throw new common_1.InternalServerErrorException();
                }
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async addEntry(addEntryDto) {
        try {
            const result = await this.personCounting.addEntry(addEntryDto);
            if (result.success) {
                return { message: 'Entry Added Successfully' };
            }
            else {
                const { error } = result;
                if (error === 404) {
                    throw new common_1.NotFoundException('Store Not Found');
                }
                else if (error === 401) {
                    throw new common_1.BadRequestException();
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
            throw new common_1.InternalServerErrorException();
        }
    }
};
exports.PersonCountingController = PersonCountingController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('stats/:store'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [person_counting_1.GetStatsDto]),
    __metadata("design:returntype", Promise)
], PersonCountingController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('add-entry'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [person_counting_1.AddEntryDto]),
    __metadata("design:returntype", Promise)
], PersonCountingController.prototype, "addEntry", null);
exports.PersonCountingController = PersonCountingController = __decorate([
    (0, common_1.Controller)('person-counting'),
    __metadata("design:paramtypes", [person_counting_service_1.PersonCountingService])
], PersonCountingController);
//# sourceMappingURL=person-counting.controller.js.map