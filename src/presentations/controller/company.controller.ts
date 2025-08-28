import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { CompanyService } from '../service/company.service';
import { AddCompanyDto } from '../dto/company';
import { cookiesOptions } from '@src/utils/constants/cookie-options';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  async addNewCompany(@Body() addCompanyDto: AddCompanyDto, @Res() res: Response) {
    try {
      const result = await this.companyService.addNewCompany(addCompanyDto);
      if (result.success) {
        res.cookie('access_token', result.access_token, cookiesOptions);

        res.status(201).json({ message: 'Business Created' });
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
}
