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
export declare class OtpService {
    private readonly otpModel;
    constructor(otpModel: Model<OTP>);
    generateOTP(email: string, type: OTP['type'], userId?: string, businessId?: string, expiryMinutes?: number): Promise<string>;
    verifyOTP(email: string, otp: string, type: OTP['type']): Promise<{
        success: boolean;
        message: string;
    }>;
    isValidOTP(email: string, otp: string, type: OTP['type']): Promise<boolean>;
}
