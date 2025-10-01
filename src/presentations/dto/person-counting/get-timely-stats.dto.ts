import { RangeType } from '@src/utils/types/range-type';
import { IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';

export class GetTimelyStatsDto {
  @IsMongoId({ each: true })
  @IsNotEmpty()
  store: string[];

  @IsNotEmpty()
  @IsEnum(RangeType)
  range: RangeType;
}
