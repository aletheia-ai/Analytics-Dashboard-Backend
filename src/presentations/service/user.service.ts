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
}
