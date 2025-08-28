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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const types_1 = require("../../utils/types");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(user) {
        try {
            const result = await this.usersService.addUser(user);
            if (result.success) {
                const payload = {
                    sub: user.email,
                    email: user.email,
                    isAuthorized: false,
                    id: result.data,
                };
                return {
                    success: true,
                    access_token: await this.jwtService.signAsync(payload),
                };
            }
            else {
                return { success: false };
            }
        }
        catch (err) {
            return { success: false };
        }
    }
    async signIn(username, pass) {
        try {
            const user = await this.usersService.findOne(username);
            if (user) {
                const isPasswordValid = await bcrypt.compare(pass, user.password);
                if (!isPasswordValid) {
                    return { success: false, error: types_1.SignInExceptions.INVALID_PASSWORD };
                }
                const payload = { sub: user.email, email: user.email, isAuthorized: user.isAuthorized };
                return {
                    success: true,
                    access_token: await this.jwtService.signAsync({ ...payload, id: user._id }),
                };
            }
            return { success: false, error: types_1.SignInExceptions.NO_USER };
        }
        catch (err) {
            throw new common_1.UnauthorizedException(types_1.SignInExceptions.NO_USER);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map