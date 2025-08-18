import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInExceptions, BusinessType, ServiceType, UserSpaceType, User } from '@utils/types';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signUp(user: User): Promise<{ success: true; data: User[] } | { success: false }> {
    try {
      const { success } = await this.usersService.addUser(user);
      if (success) {
        return { success: true, data: this.usersService.getAllUsers() };
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

        const payload = { sub: user.email, email: user.email };
        return {
          success: true,
          access_token: await this.jwtService.signAsync(payload),
        };
      }
      return { success: false, error: SignInExceptions.NO_USER };
    } catch (err) {
      throw new UnauthorizedException(SignInExceptions.NO_USER);
    }
  }
}
