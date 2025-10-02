"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCountingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PersonCountingSchema = new mongoose_1.Schema({
    store: { type: mongoose_1.Types.ObjectId, ref: 'Store', required: true },
    enterCount: { type: Number, required: true },
    exitCount: { type: Number, required: true },
    maskCount: { type: Number, required: true },
    unMaskCount: { type: Number, required: true },
    maleCount: { type: Number, required: true },
    feMaleCount: { type: Number, required: true },
    cameraId: { type: String, required: true },
    passingBy: { type: Number, required: true },
    age_0_9_Count: { type: Number, required: true },
    age_10_18_Count: { type: Number, required: true },
    age_19_34_Count: { type: Number, required: true },
    age_35_60_Count: { type: Number, required: true },
    age_60plus_Count: { type: Number, required: true },
    interestedCustomers: { type: Number, required: true },
    buyingCustomers: { type: Number, required: true },
    liveOccupancy: { type: Number, required: true },
}, { timestamps: true });
//# sourceMappingURL=person-counting.schema.js.map