//  src/presentations/controller/auth.controller.ts
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
  Delete,
  Param,
  Patch,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  
} from '@nestjs/common';
import { AuthGuard } from '@src/utils/guards/auth.guard.';
import { AuthService } from '../service/auth.service';
import {
  AuthorizeUserDto,
  ChangePasswordDto,
  DeleteAccountDto,
  SignInDto,
  SignUpDto,
  VerifyEmail,
} from '../dto/auth';
import { Response } from 'express';
import { cookiesOptions } from '@utils/constants/cookie-options';
import { UserRoleType } from '@src/utils/types';
import { EditUserByIdDto } from '../dto/user';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('authorize')
  async authorizeUser(@Body() authorizeUserDto: AuthorizeUserDto, @Res() res: Response) {
    try {
      const result = await this.authService.authorizeUser(authorizeUserDto.userId);
      if (result.success) {
        const { access_token } = result;
        res.cookie('access_token', access_token, cookiesOptions);
        res.send({ message: 'Authorization Successful' });
      } else {
        const { error } = result;
        throw new InternalServerErrorException(error);
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verifyUser(@Body() authorizeUserDto: AuthorizeUserDto, @Res() res: Response) {
    try {
      const result = await this.authService.verifyUser(authorizeUserDto.userId);
      if (result.success) {
        const { access_token } = result;
        res.cookie('access_token', access_token, cookiesOptions);
        res.send({ message: 'Verification Successful' });
      } else {
        const { error } = result;
        throw new InternalServerErrorException(error);
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

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
  async signUp(@Body() signupDto: SignUpDto, @Res() res: Response) {
    try {
      const result = await this.authService.signUp({
        ...signupDto,
        isVerified: false,
        isAuthorized: false,
        userType: UserRoleType.ADMIN,
        hasRegisteredBusiness: false,
      });

      if (result.success) {
        const { access_token } = result;
        res.cookie('access_token', access_token, cookiesOptions);
        res.send({ message: 'Register Successful' });
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
  async getProfile(@Request() req) {
    try {
      const result = await this.authService.getUserProfile(req.user.id);
      if (result.success) {
        const { stores, company, regions, user } = result;
        return {
          message: req.user,
          company: company ? company : null,
          stores: stores ? (stores.length > 0 ? stores : null) : null,
          regions: regions ? (regions.length > 0 ? regions : null) : null,
          user: user || null,
          fixedStore: process.env.STORE || null,
        };
      } else {
        throw new NotFoundException('User Not Found');
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  @Delete('delete-account/:userId')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async deleteCompanyData(@Param() deleteAccountDto: DeleteAccountDto, @Res() res: Response) {
    try {
      const result = await this.authService.deleteAccount(deleteAccountDto.userId);
      if (result.success) {
        const { maxAge, ...result } = cookiesOptions;
        res.clearCookie('access_token', { ...result, path: '/' });
        res.status(200).json({ message: 'Account Deleted Successfully' });
      } else {
        const { error, errorType } = result;
        if (error === 403) {
          if (errorType === 'user') {
            throw new ConflictException('Cannot delete this user');
          } else if (errorType === 'company') {
            throw new ConflictException('Cannot delete this business');
          } else if (errorType === 'stores') {
            throw new ConflictException('Cannot delete the stores');
          }
        } else {
          throw new InternalServerErrorException('Something Went Wrong');
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @Patch('change-password')
  @HttpCode(HttpStatus.OK)
  async changeUserPassword(@Body() changePasswordDto: ChangePasswordDto) {
    try {
      const result = await this.authService.changeUserPassword(changePasswordDto);
      if (result.success) {
        return { message: 'Password Changed!' };
      } else {
        const { error } = result;
        if (error === 403) {
          throw new ForbiddenException('Current Password is invalid');
        } else if (error === 404) {
          throw new NotFoundException();
        } else if (error === 409) {
          throw new ConflictException('New Password cannot be the old password');
        } else {
          throw new InternalServerErrorException('Something Went wrong');
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
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

  @Post('verify-email')
@HttpCode(HttpStatus.OK)
async verifyEmail(@Body() body: VerifyEmail) {
  try {
    if (!body.email) {
      throw new BadRequestException('Email is required');
    }

    const user = await this.authService.findByEmail(body.email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    return { message: 'Email exists' };
  } catch (err) {
    // Re-throw known HTTP exceptions
    if (err instanceof HttpException) {
      throw err;
    }

    // Log unknown/unexpected errors (optional but useful)
    console.error('verifyEmail error:', err);

    throw new InternalServerErrorException(
      'An unexpected error occurred while verifying email'
    );
  }
}




}
