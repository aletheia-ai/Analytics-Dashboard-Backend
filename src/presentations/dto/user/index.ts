//src/presentations/dto/user/index.ts
import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { GetUserByIdDto } from './get-user-dto';
import { EditUserByIdDto } from './edit-user.dto';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: 'Password too weak. Must include uppercase, lowercase, and a number.',
  })
  password: string;

  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Phone number must be a valid international number',
  })
  phone: string;
}

export class GetUserDto {
  @IsString()
  email: string;
}

export { GetUserByIdDto, EditUserByIdDto };
