"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = exports.CompanySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CompanySchema = new mongoose_1.Schema({
    ownerId: { type: Number, required: true },
    companyId: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
});
exports.Company = (0, mongoose_1.model)('Company', exports.CompanySchema);
//# sourceMappingURL=company.schema.js.map