"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatmapItemSchema = void 0;
const mongoose_1 = require("mongoose");
const TrackRecordSchema = new mongoose_1.Schema({
    track_id: { type: Number, required: true },
    dwell_time: { type: Number, required: true },
}, { _id: false });
exports.HeatmapItemSchema = new mongoose_1.Schema({
    store: { type: mongoose_1.Types.ObjectId, ref: 'Store', required: true },
    camera_id: { type: String, required: true },
    timestamp: { type: Number, required: true },
    grid_count: { type: [Number], required: true, default: [] },
    zone_count: {
        type: Map,
        of: Number,
        required: true,
        default: {},
    },
    zone_tracks: {
        type: Map,
        of: [TrackRecordSchema],
        required: true,
        default: {},
    },
}, { timestamps: true });
//# sourceMappingURL=heatmap.schema.js.map