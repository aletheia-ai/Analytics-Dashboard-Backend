import { Model } from 'mongoose';
import type { Company } from '@utils/types/company-type';
export declare class CompanyService {
    private company;
    constructor(company: Model<Company>);
    addNewCompany(companyData: Company): Promise<{
        success: true;
    } | {
        success: false;
        error: Number;
    }>;
}
