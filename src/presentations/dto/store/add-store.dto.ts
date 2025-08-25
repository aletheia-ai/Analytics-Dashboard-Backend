import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class AddStoreDto {
  @IsNumber()
  @IsNotEmpty()
  storeId: number;

  @IsNumber()
  @IsNotEmpty()
  regionId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}
