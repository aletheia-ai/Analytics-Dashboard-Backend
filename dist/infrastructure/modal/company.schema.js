"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModal = exports.CompanySchema = void 0;
const mongoose_1 = require("mongoose");
const types_1 = require("../../utils/types");
exports.CompanySchema = new mongoose_1.Schema({
    userSpaceType: {
        type: String,
        required: true,
        enum: Object.values(types_1.UserSpaceType),
    },
    serviceType: {
        type: String,
        required: true,
        enum: Object.values(types_1.ServiceType),
    },
    name: { type: String, required: true },
    businessType: {
        type: String,
        required: true,
        enum: Object.values(types_1.BusinessType),
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
});
exports.CompanyModal = (0, mongoose_1.model)('Company', exports.CompanySchema, 'companies');
//# sourceMappingURL=company.schema.js.map