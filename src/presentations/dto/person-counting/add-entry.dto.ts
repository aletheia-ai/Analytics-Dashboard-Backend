import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddEntryDto {
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
  child: number = 0;

  @IsNumber()
  @IsNotEmpty()
  teen: number = 0;
  @IsOptional()
  type: string;
  @IsNumber()
  @IsNotEmpty()
  adult: number = 0;

  @IsNumber()
  @IsNotEmpty()
  middle_age: number = 0;

  @IsNumber()
  @IsNotEmpty()
  old_age: number = 0;

  @IsNumber()
  @IsNotEmpty()
  passingByCount: number = 0;

  @IsNumber()
  @IsNotEmpty()
  interestedCustomers: number = 0;

  @IsNumber()
  @IsNotEmpty()
  buyingCustomers: number = 0;

  @IsNumber()
  @IsNotEmpty()
  liveOccupancy: number = 0;
  @IsOptional()
  date: string;
  @IsOptional()
  time: string;

  @IsOptional()
  dateTime: any;
}
