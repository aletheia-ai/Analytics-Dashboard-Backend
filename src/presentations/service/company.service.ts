//Analytics-Dashboard-Backend/src/presentations/service/company.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Company } from '@utils/types/company-type';
import type { User } from '@utils/types';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '@src/email/email.service';
import { UserVerificationService } from '@src/presentations/service/verification.service'; // Add this
@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private company: Model<Company>,
    @InjectModel('User') private user: Model<User>,
    private jwtService: JwtService,
       private readonly emailService: EmailService, 
        private readonly userVerificationService: UserVerificationService, // Add this
  ) {}

  async editCompany(
    id: string,
    compnayData: Omit<Company, '_id'>
  ): Promise<{ success: true; data: Company } | { success: false; error: number }> {
    try {
      const updatedCompany = await this.company.findByIdAndUpdate(
        id,
        { ...compnayData },
        { new: true, upsert: false }
      );
      if (updatedCompany) {
        return { success: true, data: { ...updatedCompany.toJSON(), _id: updatedCompany._id } };
      } else {
        return {
          success: false,
          error: 404,
        };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async getCompanyByOwner(
    userId: string
  ): Promise<{ success: true; company: Company } | { success: false; error: number }> {
    try {
      const company = await this.company.findOne({ user: userId });
      if (company) {
        return { success: true, company: company };
      } else {
        return { success: false, error: 404 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async addNewCompany(
    companyData: Omit<Company, '_id'>
  ): Promise<
    { success: true; access_token: string; company: Company } | { success: false; error: Number }
  > {
    try {
      const userExists = await this.user.exists({ _id: companyData.user });
      if (!userExists) {
        return { success: false, error: 404 };
      }

      const company = new this.company(companyData);

      const newCompany = await company.save();
      if (newCompany) {
        const updatedUser = await this.user.findByIdAndUpdate(companyData.user, {
          $set: { hasRegisteredBusiness: true },
        });
        if (updatedUser) {
          const payload = {
            sub: updatedUser.email,
            email: updatedUser.email,
            isAuthorized: false,
            hasRegisteredBusiness: true,
            id: updatedUser._id,
            isVerified: false,
          };

          return {
            success: true,
            access_token: await this.jwtService.signAsync({
              ...payload,
            }),
            company: newCompany,
          };
        } else {
          return { success: false, error: 500 };
        }
      } else {
        return { success: false, error: 500 };
      }
    } catch (error) {
      return { success: false, error: error.code };
    }
  }


  async sendBusinessVerificationEmail(userId: string): Promise<{
    success: true;
    message: string;
  } | {
    success: false;
    error: string;
  }> {
    try {
      // 1. Get user details
      const user = await this.user.findById(userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }
      
      // 2. Get company details for this user
      const company = await this.company.findOne({ user: userId });
      if (!company) {
        return { success: false, error: 'Business not found' };
      }
      
      // 3. Generate OTP
      const otpCode = this.generateOTP();
      
      // 4. Save OTP using UserVerificationService
      const saveResult = await this.userVerificationService.addOtp(userId, otpCode);
      
      if (!saveResult.success) {
        return { 
          success: false, 
          error: 'Failed to save OTP' 
        };
      }
      
      // 5. Get user's full name
      const userFullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Business Owner';
      
      // 6. Send email
      const emailSent = await this.emailService.sendBusinessVerificationEmail(
        user.email,
        userFullName,
        otpCode,
        company.name,
        company.businessType
      );
      
      if (emailSent) {
        
        return { 
          success: true, 
          message: 'Verification email sent successfully' 
        };
      } else {
        return { 
          success: false, 
          error: 'Failed to send verification email' 
        };
      }
      
    } catch (error) {
      console.error('Error sending business verification email:', error);
      return { 
        success: false, 
        error: 'Internal server error' 
      };
    }
  }
 async verifyBusinessOTP(userId: string, otp: string): Promise<{
    success: true;
    message: string;
  } | {
    success: false;
    error: string;
  }> {
    try {
      // 1. Verify OTP using UserVerificationService
      const verifyResult = await this.userVerificationService.verifyOtp(userId, otp);
      
      if (!verifyResult.success) {
        return verifyResult; // Return the error from verification service
      }
      
      // 2. Update user as authorized/verified
      const user = await this.user.findById(userId);
      if (user) {
        user.isAuthorized = true;
        user.isVerified = true;
        await user.save();
        
        
        return { 
          success: true, 
          message: 'Business verified successfully' 
        };
      } else {
        return { 
          success: false, 
          error: 'User not found' 
        };
      }
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { 
        success: false, 
        error: 'Internal server error' 
      };
    }
  }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

}
