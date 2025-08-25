import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Company } from '@utils/types/company-type';

@Injectable()
export class CompanyService {
  constructor(@InjectModel('Company') private company: Model<Company>) {}

  async addNewCompany(
    companyData: Company
  ): Promise<{ success: true } | { success: false; error: Number }> {
    try {
      const company = new this.company(companyData);
      await company.save();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.code };
    }
  }
}
