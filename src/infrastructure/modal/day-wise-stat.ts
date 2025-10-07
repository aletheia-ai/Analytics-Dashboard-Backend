import mongoose, { Schema, Types } from 'mongoose';
import { PersonCountingSchema } from './person-counting.schema';

import { DayWiseStatsType } from '@src/utils/types/day-wise-stat-type';

export const DayWiseStatsSchema = new Schema<DayWiseStatsType>({
  store: { type: Types.ObjectId, ref: 'Store', required: true },
  day: { type: String, required: true },
  data: { type: PersonCountingSchema, required: true },
});
export const DayWiseStatsModel = mongoose.model('Day_Wise_Stats', DayWiseStatsSchema);
