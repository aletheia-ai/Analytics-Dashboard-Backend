// import { Injectable } from '@nestjs/common';
// import { User } from '@utils/types';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
// @Injectable()
// export class UserService {
//   constructor(@InjectModel('User') private userModel: Model<User>) {}
//   async create(user: User) {
//     try {
//       const data = await this.userModel.create(user);
//       return data;
//     } catch (err) {
//       if (err instanceof Error) {
//         console.log(err.message);
//       } else {
//         console.log(err);
//       }
//     }
//   }

//   findAll() {
//     return this.userModel.find().exec();
//   }

//   async getUser(email: string): Promise<{ success: true; data: User } | { success: false }> {
//     try {
//       const data = await this.userModel.findOne({ email }).exec();
//       if (data) {
//         return { success: true, data };
//       } else {
//         return { success: false };
//       }
//     } catch {
//       return { success: false };
//     }
//   }
//   async getAllUsers(email: string): Promise<{ success: true; data: User } | { success: false }> {
//     try {
//       const data = await this.userModel.findOne({ email }).exec();
//       if (data) {
//         return { success: true, data };
//       } else {
//         return { success: false };
//       }
//     } catch {
//       return { success: false };
//     }
//   }
//   async deleteUser(email: string): Promise<{ success: boolean }> {
//     try {
//       console.log(email);
//       return { success: true };
//     } catch {
//       return { success: false };
//     }
//   }
// }
import { Injectable } from '@nestjs/common';

import { BusinessType, ServiceType, UserSpaceType, type User } from '@utils/types';

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      email: 'john@gmail.com',
      password: '123456789',
      name: 'John Doe',
      companyName: 'Aletheia',
      bussinessType: BusinessType.RETAIL,
      serviceType: ServiceType.COUNTING,
      userSpaceType: UserSpaceType.SINGLE_PURPOSE,
      branchCount: 2,
    },
  ];
  getAllUsers(): User[] {
    return this.users;
  }
  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
  async addUser(user: User): Promise<{ success: boolean }> {
    const result = this.users.find((item) => item.email === user.email);
    if (result) {
      return { success: false };
    } else {
      this.users.push(user);
      return { success: true };
    }
  }
}
