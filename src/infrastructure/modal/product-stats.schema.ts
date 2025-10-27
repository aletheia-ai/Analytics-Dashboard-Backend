import mongoose, { Schema, Types } from 'mongoose';

import { PersonCountingSchema } from './person-counting.schema';

import { StatsType } from '@src/utils/types/stats-type';

export const ProductStatsSchema = new Schema<StatsType & { source: string }>(
  {
    store: { type: Types.ObjectId, ref: 'Store', required: true },
    cameraId: { type: String, required: true },
    range: { type: String, required: true },
    data: { type: PersonCountingSchema, required: true },
    source: {
      type: String,
      default: 'backend',
    },
  },
  { timestamps: true }
);
export const ProductStatsModel = mongoose.model('Product_Stats', ProductStatsSchema);
