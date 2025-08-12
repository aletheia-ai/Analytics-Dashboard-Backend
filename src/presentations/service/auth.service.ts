import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInExceptions } from '@src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<
    { success: true; access_token: string } | { success: false; error: SignInExceptions }
  > {
    try {
      const user = await this.usersService.findOne(username);
      if (user) {
        if (user.password !== pass) {
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
