"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonCountingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PersonCountingSchema = new mongoose_1.Schema({
    footFall: Number,
    Exit: Number,
    age: Number,
    gender: String,
    occupancy: Number,
});
//# sourceMappingURL=person-counting.schema.js.map