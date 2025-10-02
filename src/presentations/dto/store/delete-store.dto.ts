import { IsNotEmpty, IsMongoId } from 'class-validator';

export class DeleteStoreDto {
  @IsMongoId()
  @IsNotEmpty()
  storeId: string;
  @IsMongoId()
  @IsNotEmpty()
  companyId: string;
}
