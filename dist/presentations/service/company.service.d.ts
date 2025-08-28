import { Model } from 'mongoose';
import type { Company } from '@utils/types/company-type';
import type { User } from '@utils/types';
import { JwtService } from '@nestjs/jwt';
export declare class CompanyService {
    private company;
    private user;
    private jwtService;
    constructor(company: Model<Company>, user: Model<User>, jwtService: JwtService);
    addNewCompany(companyData: Company): Promise<{
        success: true;
        access_token: string;
    } | {
        success: false;
        error: Number;
    }>;
}
