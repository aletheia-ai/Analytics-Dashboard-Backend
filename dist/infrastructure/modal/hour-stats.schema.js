"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourWiseStatsModel = exports.HourWiseStatsSchema = void 0;
const mongoose_1 = require("mongoose");
const person_counting_schema_1 = require("./person-counting.schema");
exports.HourWiseStatsSchema = new mongoose_1.Schema({
    store: { type: mongoose_1.Types.ObjectId, ref: 'Store', required: true },
    hour: { type: Number, required: true },
    data: { type: person_counting_schema_1.PersonCountingSchema, required: true },
});
exports.HourWiseStatsModel = mongoose_1.default.model('Hour_Wise_Stats', exports.HourWiseStatsSchema);
//# sourceMappingURL=hour-stats.schema.js.map