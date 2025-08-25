import { Schema, model } from 'mongoose';

export const CompanySchema = new Schema({
  ownerId: { type: Number, required: true },
  companyId: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
});

export const Company = model('Company', CompanySchema);
