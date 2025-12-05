// src/otp/otp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface OTP {
  email: string;
  otp: string;
  type: 'business_verification' | 'email_verification' | 'password_reset';
  userId?: string;
  businessId?: string;
  expiresAt: Date;
  verified: boolean;
  createdAt: Date;
}

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('OTP') private readonly otpModel: Model<OTP>,
  ) {}

  /**
   * Generate and save OTP
   */
  async generateOTP(
    email: string, 
    type: OTP['type'], 
    userId?: string,
    businessId?: string,
    expiryMinutes: number = 15
  ): Promise<string> {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiry time
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes);
    
    // Save to database
    const otpRecord = new this.otpModel({
      email,
      otp,
      type,
      userId,
      businessId,
      expiresAt,
      verified: false,
      createdAt: new Date()
    });
    
    await otpRecord.save();
    
    return otp;
  }

  /**
   * Verify OTP
   */
  async verifyOTP(
    email: string, 
    otp: string, 
    type: OTP['type']
  ): Promise<{ success: boolean; message: string }> {
    // Find OTP record
    const otpRecord = await this.otpModel.findOne({
      email,
      otp,
      type,
      verified: false
    }).sort({ createdAt: -1 }); // Get latest
    
    if (!otpRecord) {
      return { success: false, message: 'Invalid OTP' };
    }
    
    // Check if expired
    if (otpRecord.expiresAt < new Date()) {
      return { success: false, message: 'OTP has expired' };
    }
    
    // Mark as verified
    otpRecord.verified = true;
    await otpRecord.save();
    
    return { success: true, message: 'OTP verified successfully' };
  }

  /**
   * Check if OTP exists and is valid
   */
  async isValidOTP(
    email: string, 
    otp: string, 
    type: OTP['type']
  ): Promise<boolean> {
    const otpRecord = await this.otpModel.findOne({
      email,
      otp,
      type,
      verified: false,
      expiresAt: { $gt: new Date() }
    });
    
    return !!otpRecord;
  }
}