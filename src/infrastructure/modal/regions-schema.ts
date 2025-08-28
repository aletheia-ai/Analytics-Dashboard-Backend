import { Schema } from 'mongoose';
import { Region } from '@src/utils/types/region-type';
export const RegionSchema = new Schema<Region>({
  name: {
    type: String,
    required: true,
  },
});
