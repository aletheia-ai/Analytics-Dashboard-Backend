import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddCompanyDto {
  @IsNumber()
  @IsNotEmpty()
  ownerId: number;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
