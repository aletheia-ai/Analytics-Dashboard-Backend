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
exports.AddCompanyDto = void 0;
const types_1 = require("../../../utils/types");
const class_validator_1 = require("class-validator");
class AddCompanyDto {
    name;
    userSpaceType;
    serviceType;
    businessType;
    user;
}
exports.AddCompanyDto = AddCompanyDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddCompanyDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(types_1.UserSpaceType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddCompanyDto.prototype, "userSpaceType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(types_1.ServiceType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddCompanyDto.prototype, "serviceType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(types_1.BusinessType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddCompanyDto.prototype, "businessType", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddCompanyDto.prototype, "user", void 0);
//# sourceMappingURL=add-company.js.map