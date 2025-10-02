import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';

export class EditUserByIdDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
