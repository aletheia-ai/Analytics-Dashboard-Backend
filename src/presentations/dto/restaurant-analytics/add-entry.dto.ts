import { IsString, IsNotEmpty, IsMongoId, IsNumber } from 'class-validator';

export class AddEntryDto {
  @IsMongoId()
  @IsNotEmpty()
  store: string;
}
