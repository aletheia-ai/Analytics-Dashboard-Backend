import { BusinessType, ServiceType, UserSpaceType } from '@src/utils/types';
import { IsNotEmpty, IsNumber, IsEnum, IsMongoId, IsString } from 'class-validator';

export class AddCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(UserSpaceType)
  @IsNotEmpty()
  userSpaceType: UserSpaceType;

  @IsEnum(ServiceType)
  @IsNotEmpty()
  serviceType: ServiceType;

  @IsEnum(BusinessType)
  @IsNotEmpty()
  businessType: BusinessType;

  @IsMongoId()
  @IsNotEmpty()
  user: string;
}
