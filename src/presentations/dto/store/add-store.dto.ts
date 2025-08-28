import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class AddStoreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  company: string;

  @IsMongoId()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  city: string;
}
