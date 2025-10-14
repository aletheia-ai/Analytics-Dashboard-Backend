import { PeopleCountingType } from '@src/utils/types/people-counting-type';
import { Schema, Types } from 'mongoose';

export const PersonCountingSchema = new Schema<PeopleCountingType>(
  {
    enterCount: { type: Number, required: true },
    exitCount: { type: Number, required: true },
    maskCount: { type: Number, required: true },
    unMaskCount: { type: Number, required: true },
    maleCount: { type: Number, required: true },
    feMaleCount: { type: Number, required: true },
    cameraId: { type: String, required: true },
    passingBy: { type: Number, required: true },
    teen: { type: Number, required: true },
    child: { type: Number, required: true },
    adult: { type: Number, required: true },
    middle_age: { type: Number, required: true },
    old_age: { type: Number, required: true },
    interestedCustomers: { type: Number, required: true },
    buyingCustomers: { type: Number, required: true },
    liveOccupancy: { type: Number, required: true },
  },
  { timestamps: true }
);
