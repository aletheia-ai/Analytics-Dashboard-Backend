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
const types_1 = require("../../utils/types");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
dotenv.config();
let UserService = class UserService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    users = [
        {
            email: 'john@gmail.com',
            password: '$2b$10$zVQrnKY0.3/EINis07c88epv4wqbSowlJO3ow/ciiiZsqxjQg1iwG',
            name: 'John Doe',
            companyName: 'Aletheia',
            bussinessType: types_1.BusinessType.RETAIL,
            serviceType: types_1.ServiceType.COUNTING,
            userSpaceType: types_1.UserSpaceType.SINGLE_PURPOSE,
            branchCount: 2,
            userType: types_1.UserRoleType.ADMIN,
        },
    ];
    getAllUsers() {
        return this.users;
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
            await users.save();
            return { success: true };
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