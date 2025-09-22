import { PeopleCountingType } from '@src/utils/types/people-counting-type';
import { Schema, Types } from 'mongoose';

export const PersonCountingSchema = new Schema<PeopleCountingType>(
  {
    store: { type: Types.ObjectId, ref: 'Store', required: true },
    enterCount: { type: Number, required: true },
    exitCount: { type: Number, required: true },
    maskCount: { type: Number, required: true },
    unMaskCount: { type: Number, required: true },
    maleCount: { type: Number, required: true },
    feMaleCount: { type: Number, required: true },
    cameraId: { type: String, required: true },
    age_0_9_Count: { type: Number, required: true },
    age_10_18_Count: { type: Number, required: true },
    age_19_34_Count: { type: Number, required: true },
    age_35_60_Count: { type: Number, required: true },
    age_60plus_Count: { type: Number, required: true },
  },
  { timestamps: true }
);
