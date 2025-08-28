import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { BusinessType, ServiceType, UserRoleType, UserSpaceType, type User } from '@utils/types';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

dotenv.config();

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  private readonly users: User[] = [];
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
  async addUser(user: User): Promise<{ success: true; data: Types.ObjectId } | { success: false }> {
    try {
      const { password, ...rest } = user;
      const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const users = new this.userModel({ ...rest, password: hashedPassword });
      const data = await users.save();
      if (data) {
        return { success: true, data: data._id };
      } else {
        return { success: false };
      }
    } catch {
      throw new InternalServerErrorException('Something Went Wrong');
    }
  }
}
