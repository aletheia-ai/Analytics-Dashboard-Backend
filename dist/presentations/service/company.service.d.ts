import { Model } from 'mongoose';
import type { Company } from '@utils/types/company-type';
import type { User } from '@utils/types';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '@src/email/email.service';
import { UserVerificationService } from '@src/presentations/service/verification.service';
export declare class CompanyService {
    private company;
    private user;
    private jwtService;
    private readonly emailService;
    private readonly userVerificationService;
    constructor(company: Model<Company>, user: Model<User>, jwtService: JwtService, emailService: EmailService, userVerificationService: UserVerificationService);
    editCompany(id: string, compnayData: Omit<Company, '_id'>): Promise<{
        success: true;
        data: Company;
    } | {
        success: false;
        error: number;
    }>;
    getCompanyByOwner(userId: string): Promise<{
        success: true;
        company: Company;
    } | {
        success: false;
        error: number;
    }>;
    addNewCompany(companyData: Omit<Company, '_id'>): Promise<{
        success: true;
        access_token: string;
        company: Company;
    } | {
        success: false;
        error: Number;
    }>;
    sendBusinessVerificationEmail(userId: string): Promise<{
        success: true;
        message: string;
    } | {
        success: false;
        error: string;
    }>;
    verifyBusinessOTP(userId: string, otp: string): Promise<{
        success: true;
        message: string;
    } | {
        success: false;
        error: string;
    }>;
    private generateOTP;
}
