"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../../utils/types");
let UserService = class UserService {
    users = [
        {
            email: 'john@gmail.com',
            password: '123456789',
            name: 'John Doe',
            companyName: 'Aletheia',
            bussinessType: types_1.BusinessType.RETAIL,
            serviceType: types_1.ServiceType.COUNTING,
            userSpaceType: types_1.UserSpaceType.SINGLE_PURPOSE,
            branchCount: 2,
        },
    ];
    getAllUsers() {
        return this.users;
    }
    async findOne(email) {
        return this.users.find((user) => user.email === email);
    }
    async addUser(user) {
        const result = this.users.find((item) => item.email === user.email);
        if (result) {
            return { success: false };
        }
        else {
            this.users.push(user);
            return { success: true };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map