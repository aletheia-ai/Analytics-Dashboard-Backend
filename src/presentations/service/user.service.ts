import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { BusinessType, ServiceType, UserSpaceType, type User } from '@utils/types';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';

dotenv.config();

@Injectable()
export class UserService {
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
    try {
      if (result) {
        return { success: false };
      } else {
        const { password } = user;
        const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        this.users.push({ ...user, password: hashedPassword });
        return { success: true };
      }
    } catch {
      throw new InternalServerErrorException('Something Went Wrong');
    }
  }
}
