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
});
//# sourceMappingURL=person-counting.schema.js.map