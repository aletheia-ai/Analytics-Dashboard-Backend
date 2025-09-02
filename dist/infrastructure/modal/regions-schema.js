"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RegionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
});
//# sourceMappingURL=regions-schema.js.map