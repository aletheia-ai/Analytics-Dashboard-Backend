import { IsString, IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class AddEntryDto {
  @IsMongoId()
  @IsNotEmpty()
  store: string;

  @IsNumber()
  @IsNotEmpty()
  enterCount: number;

  @IsNumber()
  @IsNotEmpty()
  exitCount: number;

  @IsNumber()
  @IsNotEmpty()
  maskCount: number;

  @IsNumber()
  @IsNotEmpty()
  unMaskCount: number;

  @IsNumber()
  @IsNotEmpty()
  maleCount: number;

  @IsNumber()
  @IsNotEmpty()
  feMaleCount: number;

  @IsString()
  @IsNotEmpty()
  cameraId: string;

  @IsNumber()
  @IsNotEmpty()
  age_0_9_Count: number;

  @IsNumber()
  @IsNotEmpty()
  age_10_18_Count: number;

  @IsNumber()
  @IsNotEmpty()
  age_19_34_Count: number;

  @IsNumber()
  @IsNotEmpty()
  age_35_60_Count: number;

  @IsNumber()
  @IsNotEmpty()
  age_60plus_Count: number;

  @IsNumber()
  @IsNotEmpty()
  passingBy: number;

  @IsNumber()
  @IsNotEmpty()
  interestedCustomers: number;

  @IsNumber()
  @IsNotEmpty()
  buyingCustomers: number;

  @IsNumber()
  @IsNotEmpty()
  liveOccupancy: number;
}
