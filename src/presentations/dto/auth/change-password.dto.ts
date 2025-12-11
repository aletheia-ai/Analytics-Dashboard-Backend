//src/presentations/dto/auth/change-password.dto.ts
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
