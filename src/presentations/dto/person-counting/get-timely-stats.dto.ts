import { RangeType } from '@src/utils/types/range-type';
import { IsNotEmpty, IsMongoId, IsEnum } from 'class-validator';

export class GetTimelyStatsDto {
  @IsNotEmpty()
  @IsEnum(RangeType)
  range: RangeType;
}
