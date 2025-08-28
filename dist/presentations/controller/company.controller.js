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
exports.CompanyController = void 0;
const common_1 = require("@nestjs/common");
const company_service_1 = require("../service/company.service");
const company_1 = require("../dto/company");
const cookie_options_1 = require("../../utils/constants/cookie-options");
let CompanyController = class CompanyController {
    companyService;
    constructor(companyService) {
        this.companyService = companyService;
    }
    async addNewCompany(addCompanyDto, res) {
        try {
            const result = await this.companyService.addNewCompany(addCompanyDto);
            if (result.success) {
                res.cookie('access_token', result.access_token, cookie_options_1.cookiesOptions);
                res.status(201).json({ message: 'Business Created' });
            }
            else {
                const { error } = result;
                if (error === 11000) {
                    throw new common_1.ConflictException('One Company has already been register against this user');
                }
                else if (error === 404) {
                    throw new common_1.NotFoundException('User Does not exist');
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
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_1.AddCompanyDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "addNewCompany", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map