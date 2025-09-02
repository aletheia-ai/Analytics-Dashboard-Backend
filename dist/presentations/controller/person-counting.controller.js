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
exports.PersonCountingController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../utils/guards/auth.guard.");
const person_counting_service_1 = require("../service/person-counting.service");
let PersonCountingController = class PersonCountingController {
    personCounting;
    constructor(personCounting) {
        this.personCounting = personCounting;
    }
    async getStatistics() {
        try {
            const result = await this.personCounting.getStats();
            if (result.success) {
                return { message: result.data };
            }
            else {
                return { message: result.err };
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
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PersonCountingController.prototype, "getStatistics", null);
exports.PersonCountingController = PersonCountingController = __decorate([
    (0, common_1.Controller)('person-counting'),
    __metadata("design:paramtypes", [person_counting_service_1.PersonCountingService])
], PersonCountingController);
//# sourceMappingURL=person-counting.controller.js.map