import { IsNotEmpty, IsMongoId } from 'class-validator';

export class GetStatsDto {
  @IsMongoId()
  @IsNotEmpty()
  store: string;
}
