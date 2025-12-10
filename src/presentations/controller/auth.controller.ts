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
import { EmailService } from '@src/email/email.service';
import { UserService } from '../service/user.service';
import { UserVerificationService } from '@src/presentations/service/verification.service';
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
  constructor(private authService: AuthService,private readonly userService: UserService,
    private readonly emailService: EmailService,  private readonly userVerificationService: UserVerificationService) 
  {}

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

    // Find user by email using UserService directly
    const userResult = await this.userService.findemail(body.email);
    
    if (!userResult.success) {
      // For security, return success even if email doesn't exist
      return { 
        success: true, 
        message: 'If the email exists, a reset OTP has been sent' 
      };
    }

    // Type assertion to access the document
    const userDoc = userResult.data as any;
    const userId = userDoc._id?.toString();
    
    if (!userId) {
      console.error('User ID not found for email:', body.email);
      return { 
        success: true, 
        message: 'If the email exists, a reset OTP has been sent' 
      };
    }

    // Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save OTP
    const saveResult = await this.userVerificationService.addOtp(userId, otpCode);
    
    if (!saveResult.success) {
      console.error('Failed to save OTP for user:', userId);
      return { 
        success: true, 
        message: 'If the email exists, a reset OTP has been sent' 
      };
    }


    // Prepare display name
    const displayName = `${userDoc.firstName || ''} ${userDoc.lastName || ''}`.trim() || 'User';

    // Send OTP email
    await this.emailService.sendPasswordResetEmail(body.email, displayName, otpCode);

    return { 
      success: true, 
      message: 'If the email exists, a reset OTP has been sent' 
    };
  } catch (err) {
    if (err instanceof HttpException) {
      throw err;
    }
    console.error('verifyEmail error:', err);
    return { 
      success: true, 
      message: 'If the email exists, a reset OTP has been sent' 
    };
  }
}

// Update your verifyResetOTP endpoint in auth.controller.ts
@Post('verify-reset-otp')
@HttpCode(HttpStatus.OK)
async verifyResetOTP(@Body() body: { email: string; otp: string }) {
  try {
    const { email, otp } = body;
    if (!email || !otp) {
      
      throw new BadRequestException('Email and OTP are required');
    }
    if (otp.length !== 6) {
     
      throw new BadRequestException('Valid 6-digit OTP is required');
    }

    // Find user by email
    const userResult = await this.userService.findemail(email);
    if (!userResult.success) {
      
      throw new BadRequestException('Invalid email or OTP');
    }

    const userDoc = userResult.data as any;
    const userId = userDoc._id?.toString();
    
    if (!userId) {
  
      throw new BadRequestException('Invalid email or OTP');
    }
    const verifyResult = await this.userVerificationService.verifyOtp(userId, otp);
    if (!verifyResult.success) {
      throw new BadRequestException(verifyResult.error);
    }

    
    return { 
      success: true, 
      message: 'OTP verified successfully',
      userId
    };
  } catch (err) {
    
    if (err instanceof HttpException) {
      throw err;
    }
    throw new InternalServerErrorException('Failed to verify OTP');
  }
}


// src/presentations/controller/auth.controller.ts
@Post('reset-password')
@HttpCode(HttpStatus.OK)
async resetPassword(@Body() body: { userId: string; newPassword: string }) {
  try {
    const { userId, newPassword } = body;
    
    if (!userId || !newPassword) {
      throw new BadRequestException('User ID and new password are required');
    }

    // Add password validation
    if (newPassword.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }

    // Call a reset password service method
    const result = await this.authService.resetPassword(userId, newPassword);
    
    if (result.success) {
      return { 
        success: true, 
        message: 'Password reset successfully' 
      };
    } else {
      throw new InternalServerErrorException('Failed to reset password');
    }
  } catch (err) {
    if (err instanceof HttpException) {
      throw err;
    }
    throw new InternalServerErrorException('Failed to reset password');
  }
}
}


