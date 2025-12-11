import { HeatmapItemType, TrackRecordType } from '@src/utils/types/heatmap-item-type';
import { Schema, Types } from 'mongoose';

const TrackRecordSchema = new Schema<TrackRecordType>(
  {
    track_id: { type: Number, required: true },
    dwell_time: { type: Number, required: true },
  },
  { _id: false }
);

export const HeatmapItemSchema = new Schema<HeatmapItemType>(
  {
    store: { type: Types.ObjectId, ref: 'Store', required: true },
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
  },
  { timestamps: true }
);
