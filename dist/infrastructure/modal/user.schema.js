"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    address: String,
    email: String,
    password: String,
    phone: String,
});
//# sourceMappingURL=user.schema.js.map