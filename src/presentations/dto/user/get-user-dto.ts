import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetUserByIdDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
