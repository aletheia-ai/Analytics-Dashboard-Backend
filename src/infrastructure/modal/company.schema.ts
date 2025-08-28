import { Schema, model, Types } from 'mongoose';
import type { Company } from '@src/utils/types/company-type';
import { BusinessType, ServiceType, UserSpaceType } from '@src/utils/types';
import { UserModel } from './user.schema';
export const CompanySchema = new Schema<Company>({
  userSpaceType: {
    type: String,
    required: true,
    enum: Object.values(UserSpaceType),
  },
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
});
export const CompanyModal = model<Company>('Company', CompanySchema, 'companies');
