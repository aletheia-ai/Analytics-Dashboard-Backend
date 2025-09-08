import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInExceptions, User } from '@utils/types';
import * as bcrypt from 'bcryptjs';
import { AuthGuard } from '@src/utils/guards/auth.guard.';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}
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
}
