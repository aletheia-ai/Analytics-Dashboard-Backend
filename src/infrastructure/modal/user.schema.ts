import { Schema } from 'mongoose';
import { BusinessType, ServiceType, UserSpaceType, UserRoleType, User } from '@src/utils/types';

export const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  bussinessType: {
    type: String,
    required: true,
    enum: Object.values(BusinessType),
  },
  serviceType: {
    type: String,
    required: true,
    enum: Object.values(ServiceType),
  },
  userSpaceType: {
    type: String,
    required: true,
    enum: Object.values(UserSpaceType),
  },
  branchCount: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: Object.values(UserRoleType),
  },
});
