import mongoose, { Schema, Types } from 'mongoose';

import { UserVerificationType } from '@src/utils/types/verification-type';

export const UserVerifcationShema = new Schema<UserVerificationType>({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
});
export const UserVerifcationModel = mongoose.model('User_Verification', UserVerifcationShema);
