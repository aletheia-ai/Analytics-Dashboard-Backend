import { Injectable } from '@nestjs/common';
import { User } from '@utils/types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}
  async create(user: User) {
    try {
      const data = await this.userModel.create(user);
      console.log(data);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }
  async getUser(email: string): Promise<{ success: true; data: User } | { success: false }> {
    try {
      const data = await this.userModel.findOne({ email }).exec();
      if (data) {
        return { success: true, data };
      } else {
        return { success: false };
      }
    } catch {
      return { success: false };
    }
  }
}
