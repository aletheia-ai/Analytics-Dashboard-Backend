// src/presentations/dto/email/password-reset-email.dto.ts
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PasswordResetEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;
}