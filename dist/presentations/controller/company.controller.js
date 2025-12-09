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
const auth_guard_1 = require("../../utils/guards/auth.guard.");
let CompanyController = class CompanyController {
    companyService;
    constructor(companyService) {
        this.companyService = companyService;
    }
    async getCompanyData(getCompanyDto) {
        try {
            const result = await this.companyService.getCompanyByOwner(getCompanyDto.user);
            if (result.success) {
                return { message: result.company };
            }
            else {
                const { error } = result;
                if (error === 404) {
                    throw new common_1.NotFoundException('User Does not exist');
                }
                else {
                    throw new common_1.InternalServerErrorException('Something Went Wrong');
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
    async editCompanyData(editCompanyDto) {
        console.log('hello world');
        try {
            const { id, ...rest } = editCompanyDto;
            const result = await this.companyService.editCompany(id, rest);
            if (result.success) {
                return { message: result.data };
            }
            else {
                const { error } = result;
                if (error === 404) {
                    throw new common_1.NotFoundException('Business not exist');
                }
                else {
                    throw new common_1.InternalServerErrorException('Something Went Wrong');
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
    async addNewCompany(addCompanyDto, res) {
        try {
            const result = await this.companyService.addNewCompany(addCompanyDto);
            if (result.success) {
                res.cookie('access_token', result.access_token, cookie_options_1.cookiesOptions);
                res.status(201).json({ message: 'Business Created', company: result.company });
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
    async sendBusinessVerificationEmail(req) {
        try {
            const userId = req.user.id;
            const result = await this.companyService.sendBusinessVerificationEmail(userId);
            if (result.success) {
                return {
                    success: true,
                    message: result.message || 'Verification email sent successfully'
                };
            }
            else {
                throw new common_1.InternalServerErrorException(result.error);
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            console.error('Send verification email error:', err);
            throw new common_1.InternalServerErrorException('Failed to send verification email');
        }
    }
    async verifyBusinessOTP(req, body) {
        try {
            const userId = req.user?.id;
            const { otp } = body;
            if (!userId) {
                throw new common_1.BadRequestException('User ID not found');
            }
            if (!otp || otp.length !== 6) {
                throw new common_1.BadRequestException('Valid 6-digit OTP is required');
            }
            const result = await this.companyService.verifyBusinessOTP(userId, otp);
            if (result.success) {
                return {
                    success: true,
                    message: result.message
                };
            }
            else {
                throw new common_1.BadRequestException(result.error || 'Invalid OTP');
            }
        }
        catch (err) {
            console.error(' Error in verifyBusinessOTP controller:', err);
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            console.error(' Unexpected error:', err);
            throw new common_1.InternalServerErrorException('Failed to verify OTP');
        }
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('company-by-user/:user'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_1.GetCompanyByUserDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getCompanyData", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('edit-company'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_1.EditCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "editCompanyData", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [company_1.AddCompanyDto, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "addNewCompany", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('send-verification-email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "sendBusinessVerificationEmail", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('verify-business-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "verifyBusinessOTP", null);
exports.CompanyController = CompanyController = __decorate([
    (0, common_1.Controller)('company'),
    __metadata("design:paramtypes", [company_service_1.CompanyService])
], CompanyController);
//# sourceMappingURL=company.controller.js.map