import { BusinessType, ServiceType, UserSpaceType } from '@utils/types';
import { IsString, IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  bussinessType: BusinessType;

  @IsString()
  @IsNotEmpty()
  serviceType: ServiceType;

  @IsString()
  @IsNotEmpty()
  userSpaceType: UserSpaceType;

  @IsNumber()
  @IsNotEmpty()
  branchCount: number;
}
