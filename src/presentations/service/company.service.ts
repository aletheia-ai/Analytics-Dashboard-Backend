//Analytics-Dashboard-Backend/src/presentations/service/company.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Company } from '@utils/types/company-type';
import type { User } from '@utils/types';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '@src/email/email.service';
@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private company: Model<Company>,
    @InjectModel('User') private user: Model<User>,
    private jwtService: JwtService,
       private readonly emailService: EmailService, 
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
// In CompanyService - add this new method
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
    
    // 4. Get user's full name
    const userFullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Business Owner';
    
    // 5. Send email
    const emailSent = await this.emailService.sendBusinessVerificationEmail(
      user.email,
      userFullName,
      otpCode,
      company.name,
      company.businessType
    );
    
    if (emailSent) {
      console.log(`✅ Business verification email sent to ${user.email}`);
      console.log(`📧 OTP for ${user.email}: ${otpCode}`);
      
      // Optional: Save OTP to database for verification
      // await this.saveOTPToDatabase(user.email, otpCode, user._id, company._id);
      
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

// Keep this helper method
private generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
  // private async sendBusinessVerificationEmail(user: any, company: Company): Promise<void> {
  //   try {
  //     // Generate OTP (6-digit code)
  //     const otpCode = this.generateOTP();
      
  //     // Get user's full name
  //     const userFullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Business Owner';
      
  //     // Send the email using EmailService
  //     await this.emailService.sendBusinessVerificationEmail(
  //       user.email,
  //       userFullName,
  //       otpCode,
  //       company.name,
  //       company.businessType
  //     );
      
  //     console.log(`✅ Business verification email sent to ${user.email}`);
  //     console.log(`📧 OTP for ${user.email}: ${otpCode}`);
      
  //     // Optional: Save OTP to database for later verification
  //     // You can implement this if you need OTP verification
  //     // await this.saveOTPToDatabase(user.email, otpCode, user._id, company._id);
      
  //   } catch (emailError) {
  //     console.error('Failed to send verification email:', emailError);
  //     // Don't throw error - email failure shouldn't fail the business creation
  //     // Just log the error and continue
  //   }
  // }

  // // ✅ NEW FUNCTION: Generate OTP
  // private generateOTP(): string {
  //   return Math.floor(100000 + Math.random() * 900000).toString();
  // }

  // // ✅ NEW FUNCTION: Verify OTP (optional - if you need OTP verification)
  // async verifyBusinessOTP(
  //   email: string,
  //   otp: string
  // ): Promise<{ success: true } | { success: false; error: string }> {
  //   try {
  //     // Implement OTP verification logic here
  //     // For now, returning mock success
  //     console.log(`Verifying OTP ${otp} for email ${email}`);
      
  //     // You would typically:
  //     // 1. Check OTP from database
  //     // 2. Verify it's not expired
  //     // 3. Mark as verified
      
  //     return { success: true };
  //   } catch (error) {
  //     return { 
  //       success: false, 
  //       error: 'OTP verification failed' 
  //     };
  //   }
  // }
}
