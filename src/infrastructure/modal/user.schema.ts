//src/infrastructure/modal/user.schema.ts
import { Schema, model } from 'mongoose';
import { UserRoleType, User } from '@src/utils/types';

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
  firstName: { type: String, required: true },
  lastName: {
    type: String,
    required: true,
  },
  isAuthorized: { type: Boolean, required: true },
  isVerified: { type: Boolean, required: true },
  hasRegisteredBusiness: { type: Boolean, required: true },
  userType: {
    type: String,
    required: true,
    enum: Object.values(UserRoleType),
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  
}
);

export const UserModel = model<User>('User', UserSchema, 'users');
