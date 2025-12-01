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
                        id: updatedUser._id,
                        isVerified: false,
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
    async verifyUser(userId) {
        try {
            const userExists = await this.userModel.exists({ _id: userId });
            if (!userExists) {
                return { success: false, error: 404 };
            }
            if (userExists) {
                const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
                    $set: { isVerified: true },
                });
                if (updatedUser) {
                    const payload = {
                        sub: updatedUser.email,
                        email: updatedUser.email,
                        isAuthorized: true,
                        hasRegisteredBusiness: true,
                        id: updatedUser._id,
                        isVerified: true,
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
    async findemail(email) {
        try {
            const user = await this.userModel.findOne({ email }).exec();
            if (!user) {
                return {
                    success: false,
                    error: 404,
                    message: 'Email not found',
                };
            }
            return { success: true, data: user };
        }
        catch (err) {
            return {
                success: false,
                error: err?.code || 500,
                message: 'Failed to query database',
            };
        }
    }
    async findUserById(userId) {
        try {
            const data = await this.userModel.findOne({ _id: new mongoose_2.Types.ObjectId(userId) }).exec();
            if (data) {
                return { success: true, data };
            }
            else {
                return { success: false, error: 404 };
            }
        }
        catch (err) {
            return { success: false, error: err.code | 500 };
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
        catch (err) {
            return { success: false };
        }
    }
    async deleteUser(userId) {
        try {
            const userData = await this.userModel.findOne({ _id: new mongoose_2.Types.ObjectId(userId) });
            if (userData) {
                const deletedUser = await this.userModel.deleteOne({ _id: new mongoose_2.Types.ObjectId(userId) });
                if (deletedUser.acknowledged) {
                    return { success: true };
                }
                else {
                    return { success: false };
                }
            }
            else {
                return { success: false };
            }
        }
        catch (err) {
            return { success: false };
        }
    }
    async editUser({ userId, firstName, lastName, }) {
        try {
            const userData = await this.userModel.findByIdAndUpdate(userId, { firstName, lastName }, { new: true });
            if (userData) {
                return { success: true, data: userData };
            }
            else {
                return { success: false, error: 404 };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
        }
    }
    async changeUserPassword({ userId, password, newPassword, }) {
        try {
            if (newPassword !== password) {
                const userData = await this.userModel.findOne({ _id: new mongoose_2.Types.ObjectId(userId) });
                if (userData) {
                    const isPasswordValid = await bcrypt.compare(password, userData.password);
                    if (isPasswordValid) {
                        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
                        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
                        const updatedUser = await this.userModel.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
                        if (updatedUser) {
                            return { success: true, data: userData };
                        }
                        else {
                            return { success: false, error: 404 };
                        }
                    }
                    else {
                        return { success: false, error: 403 };
                    }
                }
                else {
                    return { success: false, error: 404 };
                }
            }
            else {
                return { success: false, error: 409 };
            }
        }
        catch (err) {
            return { success: false, error: err.code || 500 };
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