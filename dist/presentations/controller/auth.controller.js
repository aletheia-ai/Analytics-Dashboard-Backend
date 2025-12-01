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
const auth_1 = require("../dto/auth");
const cookie_options_1 = require("../../utils/constants/cookie-options");
const types_1 = require("../../utils/types");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
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
            const user = await this.authService.findByEmail(body.email);
            if (!user.success) {
                throw new common_1.NotFoundException('Email not found');
            }
            return { message: 'Email exists' };
        }
        catch (err) {
            if (err instanceof common_1.HttpException) {
                throw err;
            }
            console.error('verifyEmail error:', err);
            throw new common_1.InternalServerErrorException('An unexpected error occurred while verifying email');
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
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map