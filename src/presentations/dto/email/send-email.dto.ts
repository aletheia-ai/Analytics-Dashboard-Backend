// src/presentations/dto/email/send-email.dto.ts
import { IsEmail, IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  template: string;

  @IsObject()
  @IsOptional()
  data?: any;
}