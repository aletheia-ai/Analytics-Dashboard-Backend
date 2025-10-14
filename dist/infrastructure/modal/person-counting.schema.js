"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCountingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PersonCountingSchema = new mongoose_1.Schema({
    enterCount: { type: Number, required: true },
    exitCount: { type: Number, required: true },
    maskCount: { type: Number, required: true },
    unMaskCount: { type: Number, required: true },
    maleCount: { type: Number, required: true },
    feMaleCount: { type: Number, required: true },
    cameraId: { type: String, required: true },
    passingBy: { type: Number, required: true },
    teen: { type: Number, required: true },
    child: { type: Number, required: true },
    adult: { type: Number, required: true },
    middle_age: { type: Number, required: true },
    old_age: { type: Number, required: true },
    interestedCustomers: { type: Number, required: true },
    buyingCustomers: { type: Number, required: true },
    liveOccupancy: { type: Number, required: true },
}, { timestamps: true });
//# sourceMappingURL=person-counting.schema.js.map