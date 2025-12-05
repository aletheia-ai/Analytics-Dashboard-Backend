import { Model } from 'mongoose';
import { Email, UserEmail } from './email.interface';
import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    private readonly emailModel;
    private readonly userEmailModel;
    constructor(mailerService: MailerService, emailModel: Model<Email>, userEmailModel: Model<UserEmail>);
    save(data: Partial<Email>): Promise<void>;
    sendBusinessVerificationEmail(to: string, name: string, otpCode: string, businessName: string, businessType?: string): Promise<boolean>;
    generateOTP(): string;
    sendPasswordResetEmail(to: string, name: string, resetToken: string): Promise<boolean>;
}
