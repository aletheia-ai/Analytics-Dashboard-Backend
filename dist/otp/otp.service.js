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
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OtpService = class OtpService {
    otpModel;
    constructor(otpModel) {
        this.otpModel = otpModel;
    }
    async generateOTP(email, type, userId, businessId, expiryMinutes = 15) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);
        const otpRecord = new this.otpModel({
            email,
            otp,
            type,
            userId,
            businessId,
            expiresAt,
            verified: false,
            createdAt: new Date()
        });
        await otpRecord.save();
        return otp;
    }
    async verifyOTP(email, otp, type) {
        const otpRecord = await this.otpModel.findOne({
            email,
            otp,
            type,
            verified: false
        }).sort({ createdAt: -1 });
        if (!otpRecord) {
            return { success: false, message: 'Invalid OTP' };
        }
        if (otpRecord.expiresAt < new Date()) {
            return { success: false, message: 'OTP has expired' };
        }
        otpRecord.verified = true;
        await otpRecord.save();
        return { success: true, message: 'OTP verified successfully' };
    }
    async isValidOTP(email, otp, type) {
        const otpRecord = await this.otpModel.findOne({
            email,
            otp,
            type,
            verified: false,
            expiresAt: { $gt: new Date() }
        });
        return !!otpRecord;
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('OTP')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OtpService);
//# sourceMappingURL=otp.service.js.map