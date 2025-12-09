// src/presentations/service/verification.service.ts
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
      // Remove any existing OTP for this user
      await this.verification.deleteMany({ userId });
      
      // Create new OTP with expiration (15 minutes)
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
      const result = new this.verification({ 
        userId, 
        otp,
        expiresAt
      });
      await result.save();
      
     
      return { success: true };
      
    } catch (err: any) {
      console.error(' Error adding OTP:', err);
      return { success: false, error: err.code || 500 };
    }
  }

  async verifyOtp(userId: string, otp: string): Promise<{
    success: true;
  } | {
    success: false;
    error: string;
  }> {
    try {
      
      // Find OTP record
      const otpRecord = await this.verification.findOne({
        userId,
        otp
      }).exec();

      if (!otpRecord) {
       
        return { 
          success: false, 
          error: 'Invalid OTP. Please check and try again.' 
        };
      }

      // Check if OTP is expired
      if (otpRecord.expiresAt < new Date()) {
       
        // Clean up expired OTP
        await this.verification.deleteOne({ _id: otpRecord._id });
        return { 
          success: false, 
          error: 'OTP has expired. Please request a new one.' 
        };
      }

     
      // Delete the OTP after successful verification
      await this.verification.deleteOne({ _id: otpRecord._id });
      
      return { success: true };
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { 
        success: false, 
        error: 'Internal server error during OTP verification' 
      };
    }
  }

  async deleteUserOtps(userId: string): Promise<void> {
    await this.verification.deleteMany({ userId });
  }
}