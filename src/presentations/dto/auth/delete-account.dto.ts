import { IsNotEmpty, IsMongoId } from 'class-validator';

export class DeleteAccountDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
