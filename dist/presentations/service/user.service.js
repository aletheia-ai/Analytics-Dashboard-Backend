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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    users = [];
    getAllUsers() {
        return this.users;
    }
    async authorizeUser(userId) {
        try {
            const userExists = await this.userModel.exists({ _id: userId });
            if (!userExists) {
                return { success: false, error: 404 };
            }
            if (userExists) {
                const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
                    $set: { isAuthorized: true },
                });
                if (updatedUser) {
                    const payload = {
                        sub: updatedUser.email,
                        email: updatedUser.email,
                        isAuthorized: true,
                        hasRegisteredBusiness: true,
                    };
                    return {
                        success: true,
                        payload,
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
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async findOne(username) {
        try {
            const data = await this.userModel.findOne({ email: username });
            if (data) {
                return data;
            }
            return undefined;
        }
        catch {
            return undefined;
        }
    }
    async addUser(user) {
        try {
            const { password, ...rest } = user;
            const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const users = new this.userModel({ ...rest, password: hashedPassword });
            const data = await users.save();
            if (data) {
                return { success: true, data: data._id };
            }
            else {
                return { success: false };
            }
        }
        catch {
            throw new common_1.InternalServerErrorException('Something Went Wrong');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
//# sourceMappingURL=user.service.js.map