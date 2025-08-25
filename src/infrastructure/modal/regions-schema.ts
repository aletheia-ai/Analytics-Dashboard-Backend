import { Schema } from 'mongoose';

export const RegionSchema = new Schema({
  regionId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
