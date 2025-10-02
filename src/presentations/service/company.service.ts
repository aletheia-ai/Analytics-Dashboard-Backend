import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Company } from '@utils/types/company-type';
import type { User } from '@utils/types';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private company: Model<Company>,
    @InjectModel('User') private user: Model<User>,
    private jwtService: JwtService
  ) {}

  async editCompany(
    id: string,
    compnayData: Omit<Company, '_id'>
  ): Promise<{ success: true; data: Company } | { success: false; error: number }> {
    try {
      const updatedCompany = await this.company.findByIdAndUpdate(
        id,
        { ...compnayData },
        { new: true, upsert: false }
      );
      if (updatedCompany) {
        return { success: true, data: { ...updatedCompany.toJSON(), _id: updatedCompany._id } };
      } else {
        return {
          success: false,
          error: 404,
        };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async getCompanyByOwner(
    userId: string
  ): Promise<{ success: true; company: Company } | { success: false; error: number }> {
    try {
      const company = await this.company.findOne({ user: userId });
      if (company) {
        return { success: true, company: company };
      } else {
        return { success: false, error: 404 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async addNewCompany(
    companyData: Omit<Company, '_id'>
  ): Promise<
    { success: true; access_token: string; company: Company } | { success: false; error: Number }
  > {
    try {
      const userExists = await this.user.exists({ _id: companyData.user });
      if (!userExists) {
        return { success: false, error: 404 };
      }

      const company = new this.company(companyData);

      const newCompany = await company.save();
      if (newCompany) {
        const updatedUser = await this.user.findByIdAndUpdate(companyData.user, {
          $set: { hasRegisteredBusiness: true },
        });
        if (updatedUser) {
          const payload = {
            sub: updatedUser.email,
            email: updatedUser.email,
            isAuthorized: false,
            hasRegisteredBusiness: true,
            id: updatedUser._id,
            isVerified: false,
          };

          return {
            success: true,
            access_token: await this.jwtService.signAsync({
              ...payload,
            }),
            company: newCompany,
          };
        } else {
          return { success: false, error: 500 };
        }
      } else {
        return { success: false, error: 500 };
      }
    } catch (error) {
      return { success: false, error: error.code };
    }
  }
}
