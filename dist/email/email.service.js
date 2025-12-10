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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = class EmailService {
    mailerService;
    emailModel;
    userEmailModel;
    constructor(mailerService, emailModel, userEmailModel) {
        this.mailerService = mailerService;
        this.emailModel = emailModel;
        this.userEmailModel = userEmailModel;
    }
    async save(data) {
        try {
            const email = new this.emailModel(data);
            await email.save();
        }
        catch (error) {
            console.error('Failed to save email to database:', error);
        }
    }
    async sendBusinessVerificationEmail(to, name, otpCode, businessName, businessType) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Verify Your Business Registration',
                template: 'business-verification',
                context: {
                    name,
                    otpCode,
                    businessName,
                    businessType: businessType || 'Not specified',
                    registrationDate: new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                },
            });
            await this.save({
                to,
                subject: 'Business Verification OTP',
                template: 'business-verification',
                context: { name, otpCode, businessName, businessType },
                attachments: [],
                sentStatus: true,
            });
            return true;
        }
        catch (error) {
            console.error('Business verification email sending error:', error);
            await this.save({
                to,
                subject: 'Business Verification OTP',
                template: 'business-verification',
                context: { name, otpCode, businessName, businessType },
                attachments: [],
                sentStatus: false,
            });
            return false;
        }
    }
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendPasswordResetEmail(to, name, otpCode) {
        try {
            await this.mailerService.sendMail({
                to,
                subject: 'Reset Your Password - OTP Verification',
                template: 'password-reset',
                context: {
                    name,
                    otpCode,
                },
            });
            await this.save({
                to,
                subject: 'Reset Your Password - OTP Verification',
                template: 'password-reset',
                context: { name, otpCode },
                attachments: [],
                sentStatus: true,
            });
            return true;
        }
        catch (error) {
            await this.save({
                to,
                subject: 'Reset Your Password - OTP Verification',
                template: 'password-reset',
                context: { name, otpCode },
                attachments: [],
                sentStatus: false,
            });
            return false;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('Email')),
    __param(2, (0, mongoose_1.InjectModel)('UserEmail')),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        mongoose_2.Model,
        mongoose_2.Model])
], EmailService);
//# sourceMappingURL=email.service.js.map