import { Model } from 'mongoose';
import type { Company } from '@utils/types/company-type';
import type { User } from '@utils/types';
import { JwtService } from '@nestjs/jwt';
export declare class CompanyService {
    private company;
    private user;
    private jwtService;
    constructor(company: Model<Company>, user: Model<User>, jwtService: JwtService);
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
}
