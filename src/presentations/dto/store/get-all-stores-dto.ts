import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetStoresDto {
  @IsMongoId()
  @IsNotEmpty()
  company: string;
}
