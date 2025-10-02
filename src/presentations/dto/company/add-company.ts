import { BusinessType, ServiceType, UserSpaceType } from '@src/utils/types';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsMongoId,
  IsString,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class AddCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ServiceType)
  @IsNotEmpty()
  serviceType: ServiceType;

  @IsEnum(BusinessType)
  @IsNotEmpty()
  businessType: BusinessType;

  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;
}
