//src/infrastructure/modal/users-verifications.ts
import mongoose, { Schema, Types } from 'mongoose';

import { UserVerificationType } from '@src/utils/types/verification-type';

export const UserVerifcationShema = new Schema<UserVerificationType>({
  userId: { type: Types.ObjectId, ref: 'User', required: true },
  otp: { type: String, required: true },
    expiresAt: { 
    type: Date, 
    required: true,
    default: () => new Date(Date.now() + 15 * 60 * 1000) // 15 minutes expiration
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Create index for automatic cleanup of expired documents
UserVerifcationShema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export const UserVerifcationModel = mongoose.model('User_Verification', UserVerifcationShema);
