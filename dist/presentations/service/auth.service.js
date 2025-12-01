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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const types_1 = require("../../utils/types");
const bcrypt = require("bcryptjs");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    usersService;
    jwtService;
    store;
    company;
    region;
    constructor(usersService, jwtService, store, company, region) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.store = store;
        this.company = company;
        this.region = region;
    }
    async getUserProfile(id) {
        try {
            const userData = await this.usersService.findUserById(id);
            if (userData.success) {
                const { data } = userData;
                const company = await this.company.findOne({ user: new mongoose_2.Types.ObjectId(id) });
                const regions = await this.region.find();
                if (company) {
                    const stores = await this.store.find({ company: new mongoose_2.Types.ObjectId(company._id) });
                    return { success: true, company: company, stores, regions, user: data };
                }
                else if (!company) {
                    return { success: true, company: null, stores: null, regions, user: data };
                }
                else {
                    return { success: false, error: 404 };
                }
            }
            else {
                return { success: false, error: 404 };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async authorizeUser(userId) {
        try {
            const result = await this.usersService.authorizeUser(userId);
            if (result.success) {
                return { success: true, access_token: await this.jwtService.signAsync(result.payload) };
            }
            else {
                return { success: false, error: result.error };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async verifyUser(userId) {
        try {
            const result = await this.usersService.verifyUser(userId);
            if (result.success) {
                return { success: true, access_token: await this.jwtService.signAsync(result.payload) };
            }
            else {
                return { success: false, error: result.error };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async signUp(user) {
        try {
            const result = await this.usersService.addUser(user);
            if (result.success) {
                const payload = {
                    sub: user.email,
                    email: user.email,
                    isAuthorized: false,
                    hasRegisteredBusiness: false,
                    id: result.data,
                    isVerified: false,
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
                const payload = {
                    sub: user.email,
                    email: user.email,
                    isAuthorized: user.isAuthorized,
                    hasRegisteredBusiness: user.hasRegisteredBusiness,
                    isVerified: user.isVerified,
                };
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
    async deleteAccount(userId) {
        try {
            const companyData = await this.company.findOne({ user: new mongoose_2.Types.ObjectId(userId) });
            if (companyData) {
                const storesData = await this.store.find({ company: new mongoose_2.Types.ObjectId(companyData._id) });
                if (storesData) {
                    const deleteStores = await this.store.deleteMany({
                        company: new mongoose_2.Types.ObjectId(companyData._id),
                    });
                    if (!deleteStores.acknowledged) {
                        return { success: false, error: 403, errorType: 'stores' };
                    }
                }
                const deleteCompany = await this.company.deleteOne({ user: new mongoose_2.Types.ObjectId(userId) });
                if (!deleteCompany.acknowledged) {
                    return { success: false, error: 403, errorType: 'company' };
                }
            }
            const deleteUser = await this.usersService.deleteUser(userId);
            if (!deleteUser.success) {
                return { success: false, error: 403, errorType: 'user' };
            }
            return { success: true };
        }
        catch (err) {
            return { success: false, error: err.code || 500, errorType: 'other' };
        }
    }
    async changeUserPassword({ userId, password, newPassword, }) {
        try {
            const result = await this.usersService.changeUserPassword({ userId, newPassword, password });
            if (result.success) {
                return { success: true };
            }
            else {
                const { error } = result;
                return { success: false, error };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async findByEmail(email) {
        try {
            return await this.usersService.findOne(email);
        }
        catch (err) {
            console.error('findByEmail error:', err);
            throw new common_1.InternalServerErrorException('Failed to fetch user by email');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)('Store')),
    __param(3, (0, mongoose_1.InjectModel)('Company')),
    __param(4, (0, mongoose_1.InjectModel)('Region')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map