import { IsString, IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class AddEntryDto {
  @IsMongoId()
  @IsNotEmpty()
  store: string;

  @IsNumber()
  @IsNotEmpty()
  enterCount: number = 0;

  @IsNumber()
  @IsNotEmpty()
  exitCount: number = 0;

  @IsNumber()
  @IsNotEmpty()
  maskCount: number = 0;

  @IsNumber()
  @IsNotEmpty()
  unMaskCount: number = 0;

  @IsNumber()
  @IsNotEmpty()
  maleCount: number = 0;

  @IsNumber()
  @IsNotEmpty()
  feMaleCount: number = 0;

  @IsString()
  @IsNotEmpty()
  cameraId: string;

  @IsNumber()
  @IsNotEmpty()
  age_0_9_Count: number = 0;

  @IsNumber()
  @IsNotEmpty()
  age_10_18_Count: number = 0;

  @IsNumber()
  @IsNotEmpty()
  age_19_34_Count: number = 0;

  @IsNumber()
  @IsNotEmpty()
  age_35_60_Count: number = 0;

  @IsNumber()
  @IsNotEmpty()
  age_60plus_Count: number = 0;

  @IsNumber()
  @IsNotEmpty()
  passingBy: number = 0;

  @IsNumber()
  @IsNotEmpty()
  interestedCustomers: number = 0;

  @IsNumber()
  @IsNotEmpty()
  buyingCustomers: number = 0;

  @IsNumber()
  @IsNotEmpty()
  liveOccupancy: number = 0;
}
