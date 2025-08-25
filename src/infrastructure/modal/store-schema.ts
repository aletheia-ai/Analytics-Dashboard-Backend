// store.schema.ts
import { Schema, model } from 'mongoose';

export const StoreSchema = new Schema({
  regionId: { type: Number, required: true },
  name: { type: String, required: true },
  storeId: { type: Number, required: true, unique: true },
  companyId: { type: Number, required: true },
});

export const Store = model('Store', StoreSchema);
