import { IsNotEmpty, IsMongoId } from 'class-validator';

export class AuthorizeUserDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
