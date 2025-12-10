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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../../utils/guards/auth.guard.");
const auth_service_1 = require("../service/auth.service");
const email_service_1 = require("../../email/email.service");
const user_service_1 = require("../service/user.service");
const verification_service_1 = require("../service/verification.service");
const auth_1 = require("../dto/auth");
const cookie_options_1 = require("../../utils/constants/cookie-options");
const types_1 = require("../../utils/types");
let AuthController = class AuthController {
    authService;
    userService;
    emailService;
    userVerificationService;
    constructor(authService, userService, emailService, userVerificationService) {
        this.authService = authService;
        this.userService = userService;
        this.emailService = emailService;
        this.userVerificationService = userVerificationService;
    }
    async authorizeUser(authorizeUserDto, res) {
        try {
            const result = await this.authService.authorizeUser(authorizeUserDto.userId);
            if (result.success) {
                const { access_token } = result;
                res.cookie('access_token', access_token, cookie_options_1.cookiesOptions);
                res.send({ message: 'Authorization Successful' });
            }
            else {
                const { error } = result;
                throw new common_1.InternalServerErrorException(error);
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async verifyUser(authorizeUserDto, res) {
        try {
            const result = await this.authService.verifyUser(authorizeUserDto.userId);
            if (result.success) {
                const { access_token } = result;
                res.cookie('access_token', access_token, cookie_options_1.cookiesOptions);
                res.send({ message: 'Verification Successful' });
            }
            else {
                const { error } = result;
                throw new common_1.InternalServerErrorException(error);
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async signIn(signInDto, res) {
        try {
            const result = await this.authService.signIn(signInDto.email, signInDto.password);
            if (result.success) {
                const { access_token } = result;
                res.cookie('access_token', access_token, cookie_options_1.cookiesOptions);
                res.send({ message: 'Login Successful' });
            }
            else {
                const { error } = result;
                throw new common_1.UnauthorizedException(error);
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async signUp(signupDto, res) {
        try {
            const result = await this.authService.signUp({
                ...signupDto,
                isVerified: false,
                isAuthorized: false,
                userType: types_1.UserRoleType.ADMIN,
                hasRegisteredBusiness: false,
            });
            if (result.success) {
                const { access_token } = result;
                res.cookie('access_token', access_token, cookie_options_1.cookiesOptions);
                res.send({ message: 'Register Successful' });
            }
            else {
                throw new common_1.ConflictException('User Already Exists');
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async getProfile(req) {
        try {
            const result = await this.authService.getUserProfile(req.user.id);
            if (result.success) {
                const { stores, company, regions, user } = result;
                return {
                    message: req.user,
                    company: company ? company : null,
                    stores: stores ? (stores.length > 0 ? stores : null) : null,
                    regions: regions ? (regions.length > 0 ? regions : null) : null,
                    user: user || null,
                    fixedStore: process.env.STORE || null,
                };
            }
            else {
                throw new common_1.NotFoundException('User Not Found');
            }
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async deleteCompanyData(deleteAccountDto, res) {
        try {
            const result = await this.authService.deleteAccount(deleteAccountDto.userId);
            if (result.success) {
                const { maxAge, ...result } = cookie_options_1.cookiesOptions;
                res.clearCookie('access_token', { ...result, path: '/' });
                res.status(200).json({ message: 'Account Deleted Successfully' });
            }
            else {
                const { error, errorType } = result;
                if (error === 403) {
                    if (errorType === 'user') {
                        throw new common_1.ConflictException('Cannot delete this user');
                    }
                    else if (errorType === 'company') {
                        throw new common_1.ConflictException('Cannot delete this business');
                    }
                    else if (errorType === 'stores') {
                        throw new common_1.ConflictException('Cannot delete the stores');
                    }
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
            throw new common_1.InternalServerErrorException();
        }
    }
    async changeUserPassword(changePasswordDto) {
        try {
            const result = await this.authService.changeUserPassword(changePasswordDto);
            if (result.success) {
                return { message: 'Password Changed!' };
            }
            else {
                const { error } = result;
                if (error === 403) {
                    throw new common_1.ForbiddenException('Current Password is invalid');
                }
                else if (error === 404) {
                    throw new common_1.NotFoundException();
                }
                else if (error === 409) {
                    throw new common_1.ConflictException('New Password cannot be the old password');
                }
                else {
                    throw new common_1.InternalServerErrorException('Something Went wrong');
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
    logout(res) {
        try {
            const { maxAge, ...result } = cookie_options_1.cookiesOptions;
            res.clearCookie('access_token', { ...result, path: '/' });
            res.status(200).json({ message: 'Logout Successfull' });
        }
        catch (err) {
            throw new common_1.InternalServerErrorException();
        }
    }
    async verifyEmail(body) {
        try {
            if (!body.email) {
                throw new common_1.BadRequestException('Email is required');
            }
            const userResult = await this.userService.findemail(body.email);
            if (!userResult.success) {
                return {
                    success: true,
                    message: 'If the email exists, a reset OTP has been sent'
                };
            }
            const userDoc = userResult.data;
            const userId = userDoc._id?.toString();
            if (!userId) {
                console.error('User ID not found for email:', body.email);
                return {
                    success: true,
                    message: 'If the email exists, a reset OTP has been sent'
                };
            }
            const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
            const saveResult = await this.userVerificationService.addOtp(userId, otpCode);
            if (!saveResult.success) {
                console.error('Failed to save OTP for user:', userId);
                return {
                    success: true,
                    message: 'If the email exists, a reset OTP has been sent'
                };
            }
            const displayName = `${userDoc.firstName || ''} ${userDoc.lastName || ''}`.trim() || 'User';
            await this.emailService.sendPasswordResetEmail(body.email, displayName, otpCode);
            return {
                success: true,
                message: 'If the email exists, a reset OTP has been sent'
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            console.error('verifyEmail error:', err);
            return {
                success: true,
                message: 'If the email exists, a reset OTP has been sent'
            };
        }
    }
    async verifyResetOTP(body) {
        try {
            const { email, otp } = body;
            if (!email || !otp) {
                throw new common_1.BadRequestException('Email and OTP are required');
            }
            if (otp.length !== 6) {
                throw new common_1.BadRequestException('Valid 6-digit OTP is required');
            }
            const userResult = await this.userService.findemail(email);
            if (!userResult.success) {
                throw new common_1.BadRequestException('Invalid email or OTP');
            }
            const userDoc = userResult.data;
            const userId = userDoc._id?.toString();
            if (!userId) {
                throw new common_1.BadRequestException('Invalid email or OTP');
            }
            const verifyResult = await this.userVerificationService.verifyOtp(userId, otp);
            if (!verifyResult.success) {
                throw new common_1.BadRequestException(verifyResult.error);
            }
            return {
                success: true,
                message: 'OTP verified successfully',
                userId
            };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('Failed to verify OTP');
        }
    }
    async resetPassword(body) {
        try {
            const { userId, newPassword } = body;
            if (!userId || !newPassword) {
                throw new common_1.BadRequestException('User ID and new password are required');
            }
            if (newPassword.length < 6) {
                throw new common_1.BadRequestException('Password must be at least 6 characters long');
            }
            const result = await this.authService.resetPassword(userId, newPassword);
            if (result.success) {
                return {
                    success: true,
                    message: 'Password reset successfully'
                };
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to reset password');
            }
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            throw new common_1.InternalServerErrorException('Failed to reset password');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('authorize'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.AuthorizeUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authorizeUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.AuthorizeUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyUser", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.SignUpDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Delete)('delete-account/:userId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.DeleteAccountDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteCompanyData", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)('change-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changeUserPassword", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('verify-email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_1.VerifyEmail]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, common_1.Post)('verify-reset-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetOTP", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService,
        email_service_1.EmailService, verification_service_1.UserVerificationService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map