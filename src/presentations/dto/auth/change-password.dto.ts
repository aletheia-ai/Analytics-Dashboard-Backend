import { IsNotEmpty, IsMongoId, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
