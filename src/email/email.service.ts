// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email,UserEmail } from './email.interface';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class EmailService {
  constructor(
     private readonly mailerService: MailerService,
    @InjectModel('Email') private readonly emailModel: Model<Email>,
    @InjectModel('UserEmail') private readonly userEmailModel: Model<UserEmail>,
  ) {}

  async save(data: Partial<Email>): Promise<void> {
    try {
      const email = new this.emailModel(data);
      await email.save();
      console.log('✅ Email logged to database');
    } catch (error) {
      console.error('Failed to save email to database:', error);
    }
  }
  async sendBusinessVerificationEmail(
    to: string,
    name: string,
    otpCode: string,
    businessName: string,
    businessType?: string
  ): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to,
        subject: 'Verify Your Business Registration',
        template: 'business-verification', // means business-verification.hbs
        context: {
          name,
          otpCode,
          businessName,
          businessType: businessType || 'Not specified',
          registrationDate: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        },
      });

      await this.save({
        to,
        subject: 'Business Verification OTP',
        template: 'business-verification',
        context: { name, otpCode, businessName, businessType },
        attachments: [],
        sentStatus: true,
      });

      console.log(`✅ Business verification email sent to ${to}`);
      return true;
    } catch (error) {
      console.error('Business verification email sending error:', error);

      await this.save({
        to,
        subject: 'Business Verification OTP',
        template: 'business-verification',
        context: { name, otpCode, businessName, businessType },
        attachments: [],
        sentStatus: false,
      });

      return false;
    }
  }

  /**
   * Generate OTP (6-digit code)
   */
  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  async sendPasswordResetEmail(
  to: string,
  name: string,
  resetToken: string
): Promise<boolean> {
  try {
    const frontendUrl = process.env.FRONTEND_URL;
    const resetLink = `${frontendUrl}/reset-password/verify?token=${resetToken}`;

    await this.mailerService.sendMail({
      to,
      subject: 'Reset Your Password',
      template: 'password-reset', // means password-reset.hbs
      context: {
        name,
        resetLink,
      },
    });

    await this.save({
      to,
      subject: 'Reset Your Password',
      template: 'password-reset',
      context: { name, resetLink },
      attachments: [],
      sentStatus: true,
    });

    return true;
  } catch (error) {
    console.error(' Email sending error:', error);

    await this.save({
      to,
      subject: 'Reset Your Password',
      template: 'password-reset',
      context: { name },
      attachments: [],
      sentStatus: false,
    });

    return false;
  }
}

}