import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@src/utils/guards/auth.guard.';
import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/auth';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const result = await this.authService.signIn(signInDto.email, signInDto.password);
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 1000,
    });
    res.send({ message: 'Login Successful' });
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
