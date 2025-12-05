//Analytics-Dashboard-Backend/src/presentations/controller/company.controller.ts
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Res,
  UseGuards,
  Request as Req, // Rename Request import to avoid conflict
} from '@nestjs/common';

import { Response } from 'express';

import { CompanyService } from '../service/company.service';
import { AddCompanyDto, EditCompanyDto, GetCompanyByUserDto } from '../dto/company';
import { cookiesOptions } from '@src/utils/constants/cookie-options';
import { AuthGuard } from '@src/utils/guards/auth.guard.';
import { JwtService } from '@nestjs/jwt';
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('company-by-user/:user')
  async getCompanyData(@Param() getCompanyDto: GetCompanyByUserDto) {
    try {
      const result = await this.companyService.getCompanyByOwner(getCompanyDto.user);
      if (result.success) {
        return { message: result.company };
      } else {
        const { error } = result;
        if (error === 404) {
          throw new NotFoundException('User Does not exist');
        } else {
          throw new InternalServerErrorException('Something Went Wrong');
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('edit-company')
  async editCompanyData(@Body() editCompanyDto: EditCompanyDto) {
    console.log('hello world');
    try {
      const { id, ...rest } = editCompanyDto;
      const result = await this.companyService.editCompany(id, rest);
      if (result.success) {
        return { message: result.data };
      } else {
        const { error } = result;

        if (error === 404) {
          throw new NotFoundException('Business not exist');
        } else {
          throw new InternalServerErrorException('Something Went Wrong');
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  async addNewCompany(@Body() addCompanyDto: AddCompanyDto, @Res() res: Response) {
    try {
      const result = await this.companyService.addNewCompany(addCompanyDto);
      if (result.success) {
        res.cookie('access_token', result.access_token, cookiesOptions);

        res.status(201).json({ message: 'Business Created', company: result.company });
      } else {
        const { error } = result;
        if (error === 11000) {
          throw new ConflictException('One Company has already been register against this user');
        } else if (error === 404) {
          throw new NotFoundException('User Does not exist');
        } else {
          throw new InternalServerErrorException('Something went wrong');
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @UseGuards(AuthGuard)
  @Post('send-verification-email')
  @HttpCode(HttpStatus.OK)
  async sendBusinessVerificationEmail(@Req() req: any) { // Use @Req() instead of @Request()
    try {
      const userId = req.user.id;
      
      console.log(`📧 Sending verification email for user: ${userId}`);
      
      const result = await this.companyService.sendBusinessVerificationEmail(userId);
      
      if (result.success) {
        return { 
          success: true, 
          message: result.message || 'Verification email sent successfully' 
        };
      } else {
        throw new InternalServerErrorException(result.error);
      }
      
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      console.error('Send verification email error:', err);
      throw new InternalServerErrorException('Failed to send verification email');
    }
  }
}
