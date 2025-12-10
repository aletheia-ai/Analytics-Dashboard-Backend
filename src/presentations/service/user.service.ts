//src/presentations/service/user.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { type User } from '@utils/types';
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

  async authorizeUser(userId: string): Promise<
    | {
        success: true;
        payload: {
          sub: string;
          email: string;
          isAuthorized: boolean;
          hasRegisteredBusiness: boolean;
          isVerified: boolean;
        };
      }
    | { success: false; error: number }
  > {
    try {
      const userExists = await this.userModel.exists({ _id: userId });
      if (!userExists) {
        return { success: false, error: 404 };
      }

      if (userExists) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
          $set: { isAuthorized: true },
        });
        if (updatedUser) {
          const payload = {
            sub: updatedUser.email,
            email: updatedUser.email,
            isAuthorized: true,
            hasRegisteredBusiness: true,
            id: updatedUser._id,
            isVerified: false,
          };
          return {
            success: true,
            payload,
          };
        } else {
          return { success: false, error: 500 };
        }
      } else {
        return { success: false, error: 500 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async verifyUser(userId: string): Promise<
    | {
        success: true;
        payload: {
          sub: string;
          email: string;
          isAuthorized: boolean;
          hasRegisteredBusiness: boolean;
          isVerified: boolean;
        };
      }
    | { success: false; error: number }
  > {
    try {
      const userExists = await this.userModel.exists({ _id: userId });
      if (!userExists) {
        return { success: false, error: 404 };
      }

      if (userExists) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
          $set: { isVerified: true },
        });
        if (updatedUser) {
          const payload = {
            sub: updatedUser.email,
            email: updatedUser.email,
            isAuthorized: true,
            hasRegisteredBusiness: true,
            id: updatedUser._id,
            isVerified: true,
          };
          return {
            success: true,
            payload,
          };
        } else {
          return { success: false, error: 500 };
        }
      } else {
        return { success: false, error: 500 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
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
  async findemail(
    email: string
  ): Promise<{ success: true; data: User } | { success: false; error: number; message: string }> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        return {
          success: false,
          error: 404,
          message: 'Email not found',
        };
      }

      return { success: true, data: user };
    } catch (err: any) {
      return {
        success: false,
        error: err?.code || 500,
        message: 'Failed to query database',
      };
    }
  }

  async findUserById(
    userId: string
  ): Promise<{ success: true; data: User } | { success: false; error: number }> {
    try {
      const data = await this.userModel.findOne({ _id: new Types.ObjectId(userId) }).exec();
      if (data) {
        return { success: true, data };
      } else {
        return { success: false, error: 404 };
      }
    } catch (err) {
      return { success: false, error: err.code | 500 };
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
    } catch (err) {
      return { success: false };
    }
  }

  async deleteUser(userId: string): Promise<{ success: boolean }> {
    try {
      const userData = await this.userModel.findOne({ _id: new Types.ObjectId(userId) });
      if (userData) {
        const deletedUser = await this.userModel.deleteOne({ _id: new Types.ObjectId(userId) });
        if (deletedUser.acknowledged) {
          return { success: true };
        } else {
          return { success: false };
        }
      } else {
        return { success: false };
      }
    } catch (err) {
      return { success: false };
    }
  }

  async editUser({
    userId,
    firstName,
    lastName,
  }: {
    userId: string;
    firstName: string;
    lastName: string;
  }): Promise<{ success: true; data: User } | { success: false; error: number }> {
    try {
      const userData = await this.userModel.findByIdAndUpdate(
        userId,
        { firstName, lastName },
        { new: true }
      );
      if (userData) {
        return { success: true, data: userData };
      } else {
        return { success: false, error: 404 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
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
  }): Promise<{ success: true; data: User } | { success: false; error: number }> {
    try {
      if (newPassword !== password) {
        const userData = await this.userModel.findOne({ _id: new Types.ObjectId(userId) });
        if (userData) {
          const isPasswordValid = await bcrypt.compare(password, userData.password);
          if (isPasswordValid) {
            const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
            const updatedUser = await this.userModel.findByIdAndUpdate(
              userId,
              { password: hashedPassword },
              { new: true }
            );
            if (updatedUser) {
              return { success: true, data: userData };
            } else {
              return { success: false, error: 404 };
            }
          } else {
            return { success: false, error: 403 };
          }
        } else {
          return { success: false, error: 404 };
        }
      } else {
        return { success: false, error: 409 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }
async updateUserByEmail(
  email: string,
  updateData: Partial<User>
): Promise<{ success: boolean }> {
  try {
    const updated = await this.userModel.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    return { success: !!updated };
  } catch (err) {
    console.error('updateUserByEmail error:', err);
    return { success: false };
  }
}
// src/presentations/service/user.service.ts
async resetPassword(
  userId: string,
  newPassword: string
): Promise<{ success: true; data: User } | { success: false; error: number }> {
  try {
    const userData = await this.userModel.findOne({ _id: new Types.ObjectId(userId) });
    if (!userData) {
      return { success: false, error: 404 };
    }

    // Hash the new password
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Update the password
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );
    
    if (updatedUser) {
      return { success: true, data: updatedUser };
    } else {
      return { success: false, error: 500 };
    }
  } catch (err) {
    return { success: false, error: err.code || 500 };
  }
}

}
