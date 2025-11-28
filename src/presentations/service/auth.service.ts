// src/presentations/service/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInExceptions, User } from '@utils/types';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Store } from '@src/utils/types/store-type';
import { Company } from '@src/utils/types/company-type';
import { Region } from '@src/utils/types/region-type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel('Store') private store: Model<Store>,
    @InjectModel('Company') private company: Model<Company>,
    @InjectModel('Region') private region: Model<Region>
  ) {}

  async getUserProfile(id: string): Promise<
    | {
        success: true;
        company: Company | null;
        stores: Store[] | null;
        regions: Region[];
        user: User;
      }
    | { success: false; error: number }
  > {
    try {
      const userData = await this.usersService.findUserById(id);
      if (userData.success) {
        const { data } = userData;
        const company = await this.company.findOne({ user: new Types.ObjectId(id) });
        const regions = await this.region.find();
        if (company) {
          const stores = await this.store.find({ company: new Types.ObjectId(company._id) });
          return { success: true, company: company, stores, regions, user: data };
        } else if (!company) {
          return { success: true, company: null, stores: null, regions, user: data };
        } else {
          return { success: false, error: 404 };
        }
      } else {
        return { success: false, error: 404 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async authorizeUser(
    userId: string
  ): Promise<{ success: true; access_token: string } | { success: false; error: number }> {
    try {
      const result = await this.usersService.authorizeUser(userId);
      if (result.success) {
        return { success: true, access_token: await this.jwtService.signAsync(result.payload) };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async verifyUser(
    userId: string
  ): Promise<{ success: true; access_token: string } | { success: false; error: number }> {
    try {
      const result = await this.usersService.verifyUser(userId);
      if (result.success) {
        return { success: true, access_token: await this.jwtService.signAsync(result.payload) };
      } else {
        return { success: false, error: result.error };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async signUp(user: User): Promise<{ success: true; access_token: string } | { success: false }> {
    try {
      const result = await this.usersService.addUser(user);

      if (result.success) {
        const payload = {
          sub: user.email,
          email: user.email,
          isAuthorized: false,
          hasRegisteredBusiness: false,
          id: result.data,
          isVerified: false,
        };
        return {
          success: true,
          access_token: await this.jwtService.signAsync(payload),
        };
      } else {
        return { success: false };
      }
    } catch (err) {
      return { success: false };
    }
  }

  async signIn(
    username: string,
    pass: string
  ): Promise<
    { success: true; access_token: string } | { success: false; error: SignInExceptions }
  > {
    try {
      const user = await this.usersService.findOne(username);
      if (user) {
        const isPasswordValid = await bcrypt.compare(pass, user.password);
        if (!isPasswordValid) {
          return { success: false, error: SignInExceptions.INVALID_PASSWORD };
        }

        const payload = {
          sub: user.email,
          email: user.email,
          isAuthorized: user.isAuthorized,
          hasRegisteredBusiness: user.hasRegisteredBusiness,
          isVerified: user.isVerified,
        };
        return {
          success: true,
          access_token: await this.jwtService.signAsync({ ...payload, id: (user as any)._id }),
        };
      }
      return { success: false, error: SignInExceptions.NO_USER };
    } catch (err) {
      throw new UnauthorizedException(SignInExceptions.NO_USER);
    }
  }

  async deleteAccount(
    userId: string
  ): Promise<
    | { success: true }
    | { success: false; error: number; errorType: 'user' | 'company' | 'stores' | 'other' }
  > {
    try {
      const companyData = await this.company.findOne({ user: new Types.ObjectId(userId) });
      if (companyData) {
        const storesData = await this.store.find({ company: new Types.ObjectId(companyData._id) });
        if (storesData) {
          const deleteStores = await this.store.deleteMany({
            company: new Types.ObjectId(companyData._id),
          });
          if (!deleteStores.acknowledged) {
            return { success: false, error: 403, errorType: 'stores' };
          }
        }
        const deleteCompany = await this.company.deleteOne({ user: new Types.ObjectId(userId) });
        if (!deleteCompany.acknowledged) {
          return { success: false, error: 403, errorType: 'company' };
        }
      }
      const deleteUser = await this.usersService.deleteUser(userId);
      if (!deleteUser.success) {
        return { success: false, error: 403, errorType: 'user' };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.code || 500, errorType: 'other' };
    }
  }

  async changeUserPassword({
    userId,
    password,
    newPassword,
  }: {
    userId: string;
    password: string;
    newPassword: string;
  }): Promise<{ success: true } | { success: false; error: number }> {
    try {
      const result = await this.usersService.changeUserPassword({ userId, newPassword, password });
      if (result.success) {
        return { success: true };
      } else {
        const { error } = result;
        return { success: false, error };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async findByEmail(email: string) {
  return await this.usersService.findOne(email);
}

}
