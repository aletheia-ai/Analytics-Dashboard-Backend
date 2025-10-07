import mongoose, { Schema, Types } from 'mongoose';
import { PersonCountingSchema } from './person-counting.schema';

import { HourWiseStatsType } from '@src/utils/types/hour-stat.type';

export const HourWiseStatsSchema = new Schema<HourWiseStatsType>({
  store: { type: Types.ObjectId, ref: 'Store', required: true },
  hour: { type: Number, required: true },
  data: { type: PersonCountingSchema, required: true },
});
export const HourWiseStatsModel = mongoose.model('Hour_Wise_Stats', HourWiseStatsSchema);
