import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetCompanyByUserDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;
}
