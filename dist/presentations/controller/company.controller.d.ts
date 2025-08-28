import { Response } from 'express';
import { CompanyService } from '../service/company.service';
import { AddCompanyDto } from '../dto/company';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    addNewCompany(addCompanyDto: AddCompanyDto, res: Response): Promise<void>;
}
