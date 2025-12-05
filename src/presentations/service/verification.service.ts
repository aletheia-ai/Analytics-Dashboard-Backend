import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserVerificationType } from '@src/utils/types/verification-type';

@Injectable()
export class UserVerificationService {
  constructor(
    @InjectModel('User_Verification') private verification: Model<UserVerificationType>
  ) {}

  async addOtp(
    userId: string,
    otp: string
  ): Promise<{ success: true } | { success: false; error: number }> {
    try {
      const result = new this.verification({ userId, otp });
      await result.save();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.code || 500 };
    }
  }
}
