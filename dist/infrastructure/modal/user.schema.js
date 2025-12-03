"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
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
    firstName: { type: String, required: true },
    lastName: {
        type: String,
        required: true,
    },
    isAuthorized: { type: Boolean, required: true },
    isVerified: { type: Boolean, required: true },
    hasRegisteredBusiness: { type: Boolean, required: true },
    userType: {
        type: String,
        required: true,
        enum: Object.values(types_1.UserRoleType),
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
});
exports.UserModel = (0, mongoose_1.model)('User', exports.UserSchema, 'users');
//# sourceMappingURL=user.schema.js.map