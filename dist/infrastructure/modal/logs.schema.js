"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSchema = void 0;
const mongoose_1 = require("mongoose");
exports.logSchema = new mongoose_1.Schema({
    logs: { type: String, required: false },
    label: { type: String, required: true, default: 'pizza' },
    status: { type: String, required: true, default: 'presence' },
}, { timestamps: true });
//# sourceMappingURL=logs.schema.js.map