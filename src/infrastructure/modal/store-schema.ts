// store.schema.ts
import { Schema, model, Types } from 'mongoose';
import type { Store } from '@src/utils/types/store-type';
export const StoreSchema = new Schema<Store>({
  region: { type: Types.ObjectId, ref: 'Region', required: true },
  name: { type: String, required: true, unique: true, index: true },
  company: {
    type: Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

export const StoreModal = model('Store', StoreSchema);
