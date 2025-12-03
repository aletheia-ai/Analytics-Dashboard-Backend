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