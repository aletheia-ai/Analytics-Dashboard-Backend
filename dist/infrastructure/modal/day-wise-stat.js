"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DayWiseStatsModel = exports.DayWiseStatsSchema = void 0;
const mongoose_1 = require("mongoose");
const person_counting_schema_1 = require("./person-counting.schema");
exports.DayWiseStatsSchema = new mongoose_1.Schema({
    store: { type: mongoose_1.Types.ObjectId, ref: 'Store', required: true },
    day: { type: String, required: true },
    data: { type: person_counting_schema_1.PersonCountingSchema, required: true },
});
exports.DayWiseStatsModel = mongoose_1.default.model('Day_Wise_Stats', exports.DayWiseStatsSchema);
//# sourceMappingURL=day-wise-stat.js.map