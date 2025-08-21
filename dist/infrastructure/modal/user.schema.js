"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../../utils/types");
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    bussinessType: {
        type: String,
        required: true,
        enum: Object.values(types_1.BusinessType),
    },
    serviceType: {
        type: String,
        required: true,
        enum: Object.values(types_1.ServiceType),
    },
    userSpaceType: {
        type: String,
        required: true,
        enum: Object.values(types_1.UserSpaceType),
    },
    branchCount: {
        type: Number,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: Object.values(types_1.UserRoleType),
    },
});
//# sourceMappingURL=user.schema.js.map