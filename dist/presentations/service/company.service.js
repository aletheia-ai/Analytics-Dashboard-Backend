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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const email_service_1 = require("../../email/email.service");
let CompanyService = class CompanyService {
    company;
    user;
    jwtService;
    emailService;
    constructor(company, user, jwtService, emailService) {
        this.company = company;
        this.user = user;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async editCompany(id, compnayData) {
        try {
            const updatedCompany = await this.company.findByIdAndUpdate(id, { ...compnayData }, { new: true, upsert: false });
            if (updatedCompany) {
                return { success: true, data: { ...updatedCompany.toJSON(), _id: updatedCompany._id } };
            }
            else {
                return {
                    success: false,
                    error: 404,
                };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async getCompanyByOwner(userId) {
        try {
            const company = await this.company.findOne({ user: userId });
            if (company) {
                return { success: true, company: company };
            }
            else {
                return { success: false, error: 404 };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async addNewCompany(companyData) {
        try {
            const userExists = await this.user.exists({ _id: companyData.user });
            if (!userExists) {
                return { success: false, error: 404 };
            }
            const company = new this.company(companyData);
            const newCompany = await company.save();
            if (newCompany) {
                const updatedUser = await this.user.findByIdAndUpdate(companyData.user, {
                    $set: { hasRegisteredBusiness: true },
                });
                if (updatedUser) {
                    const payload = {
                        sub: updatedUser.email,
                        email: updatedUser.email,
                        isAuthorized: false,
                        hasRegisteredBusiness: true,
                        id: updatedUser._id,
                        isVerified: false,
                    };
                    return {
                        success: true,
                        access_token: await this.jwtService.signAsync({
                            ...payload,
                        }),
                        company: newCompany,
                    };
                }
                else {
                    return { success: false, error: 500 };
                }
            }
            else {
                return { success: false, error: 500 };
            }
        }
        catch (error) {
            return { success: false, error: error.code };
        }
    }
    async sendBusinessVerificationEmail(userId) {
        try {
            const user = await this.user.findById(userId);
            if (!user) {
                return { success: false, error: 'User not found' };
            }
            const company = await this.company.findOne({ user: userId });
            if (!company) {
                return { success: false, error: 'Business not found' };
            }
            const otpCode = this.generateOTP();
            const userFullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Business Owner';
            const emailSent = await this.emailService.sendBusinessVerificationEmail(user.email, userFullName, otpCode, company.name, company.businessType);
            if (emailSent) {
                console.log(`✅ Business verification email sent to ${user.email}`);
                console.log(`📧 OTP for ${user.email}: ${otpCode}`);
                return {
                    success: true,
                    message: 'Verification email sent successfully'
                };
            }
            else {
                return {
                    success: false,
                    error: 'Failed to send verification email'
                };
            }
        }
        catch (error) {
            console.error('Error sending business verification email:', error);
            return {
                success: false,
                error: 'Internal server error'
            };
        }
    }
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Company')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        email_service_1.EmailService])
], CompanyService);
//# sourceMappingURL=company.service.js.map