import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BusinessType, ServiceType, UserRoleType, UserSpaceType, type User } from '@utils/types';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

dotenv.config();

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  private readonly users: User[] = [
    {
      email: 'john@gmail.com',
      password: '$2b$10$zVQrnKY0.3/EINis07c88epv4wqbSowlJO3ow/ciiiZsqxjQg1iwG',
      name: 'John Doe',
      companyName: 'Aletheia',
      bussinessType: BusinessType.RETAIL,
      serviceType: ServiceType.COUNTING,
      userSpaceType: UserSpaceType.SINGLE_PURPOSE,
      branchCount: 2,
      userType: UserRoleType.ADMIN,
    },
  ];
  getAllUsers(): User[] {
    return this.users;
  }
  async findOne(username: string): Promise<User | undefined> {
    try {
      const data = await this.userModel.findOne({ email: username });
      if (data) {
        return data;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }
  async addUser(user: User): Promise<{ success: boolean }> {
    try {
      const { password, ...rest } = user;
      const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const users = new this.userModel({ ...rest, password: hashedPassword });
      await users.save();

      return { success: true };
      // }
    } catch {
      throw new InternalServerErrorException('Something Went Wrong');
    }
  }
}
