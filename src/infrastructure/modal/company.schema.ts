import { Schema, model, Types } from 'mongoose';
import type { Company } from '@src/utils/types/company-type';
import { BusinessType, ServiceType, UserSpaceType } from '@src/utils/types';

export const CompanySchema = new Schema<Company>({
  serviceType: {
    type: String,
    required: true,
    enum: Object.values(ServiceType),
  },
  name: { type: String, required: true },
  businessType: {
    type: String,
    required: true,
    enum: Object.values(BusinessType),
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    requred: true,
  },
  country: {
    type: String,
    requred: true,
  },
  state: {
    type: String,
    requred: true,
  },
  city: {
    type: String,
    requred: true,
  },
  address: {
    type: String,
    requred: true,
  },

  phone: {
    type: String,
    requred: true,
  },
});

export const CompanyModal = model<Company>('Company', CompanySchema, 'companies');
