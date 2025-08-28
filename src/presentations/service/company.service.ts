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

  async addNewCompany(
    companyData: Company
  ): Promise<{ success: true; access_token: string } | { success: false; error: Number }> {
    try {
      const userExists = await this.user.exists({ _id: companyData.user });
      if (!userExists) {
        return { success: false, error: 404 };
      }

      const company = new this.company(companyData);

      const newCompany = await company.save();
      if (newCompany) {
        const updatedUser = await this.user.findByIdAndUpdate(companyData.user, {
          $set: { isAuthorized: true },
        });
        if (updatedUser) {
          const payload = {
            sub: updatedUser.email,
            email: updatedUser.email,
            isAuthorized: true,
          };

          return {
            success: true,
            access_token: await this.jwtService.signAsync({
              ...payload,
              id: (this.user as any)._id,
            }),
          };
          // return { success: true };
        } else {
          return { success: false, error: 500 };
        }
      } else {
        return { success: false, error: 500 };
      }
    } catch (error) {
      console.log(error);
      return { success: false, error: error.code };
    }
  }
}
