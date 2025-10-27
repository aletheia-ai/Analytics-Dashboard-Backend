"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStatsModel = exports.ProductStatsSchema = void 0;
const mongoose_1 = require("mongoose");
const person_counting_schema_1 = require("./person-counting.schema");
exports.ProductStatsSchema = new mongoose_1.Schema({
    store: { type: mongoose_1.Types.ObjectId, ref: 'Store', required: true },
    cameraId: { type: String, required: true },
    range: { type: String, required: true },
    data: { type: person_counting_schema_1.PersonCountingSchema, required: true },
    source: {
        type: String,
        default: 'backend',
    },
}, { timestamps: true });
exports.ProductStatsModel = mongoose_1.default.model('Product_Stats', exports.ProductStatsSchema);
//# sourceMappingURL=product-stats.schema.js.map