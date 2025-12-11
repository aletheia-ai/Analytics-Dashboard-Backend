//src/presentations/dto/auth/verify-email.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmail {
  @IsString()
  @IsNotEmpty()
  email: string;
}