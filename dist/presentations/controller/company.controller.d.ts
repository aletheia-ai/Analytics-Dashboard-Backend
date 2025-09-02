import { Response } from 'express';
import { CompanyService } from '../service/company.service';
import { AddCompanyDto, GetCompanyByUserDto } from '../dto/company';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    getCompanyData(getCompanyDto: GetCompanyByUserDto): Promise<{
        message: import("../../utils/types/company-type").Company;
    }>;
    addNewCompany(addCompanyDto: AddCompanyDto, res: Response): Promise<void>;
}
