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
  HttpException,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@src/utils/guards/auth.guard.';
import { AuthService } from '../service/auth.service';
import { SignInDto, SignUpDto } from '../dto/auth';
import { Response } from 'express';
import { cookiesOptions } from '@utils/constants/cookie-options';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const result = await this.authService.signIn(signInDto.email, signInDto.password);
      if (result.success) {
        const { access_token } = result;
        res.cookie('access_token', access_token, cookiesOptions);
        res.send({ message: 'Login Successful' });
      } else {
        const { error } = result;
        throw new UnauthorizedException(error);
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signupDto: SignUpDto) {
    try {
      const result = await this.authService.signUp(signupDto);
      if (result.success) {
        return { message: 'Register Successfull', data: result.data };
      } else {
        throw new ConflictException('User Already Exists');
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response) {
    try {
      const { maxAge, ...result } = cookiesOptions;
      res.clearCookie('access_token', { ...result, path: '/' });

      res.status(200).json({ message: 'Logout Successfull' });
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
