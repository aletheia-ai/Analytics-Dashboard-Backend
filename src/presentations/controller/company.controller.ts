import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';

import { CompanyService } from '../service/company.service';
import { AddCompanyDto } from '../dto/company';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  async addNewCompany(@Body() addCompanyDto: AddCompanyDto) {
    try {
      const result = await this.companyService.addNewCompany(addCompanyDto);
      if (result.success) {
        return { message: 'Company Created' };
      } else {
        const { error } = result;
        if (error === 11000) {
          throw new ConflictException('Company with this ID already exists');
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
