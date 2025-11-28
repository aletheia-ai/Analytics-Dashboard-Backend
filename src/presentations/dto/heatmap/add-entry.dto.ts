import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsObject,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TrackRecordDto {
  @IsNumber()
  @IsNotEmpty()
  track_id: number;

  @IsNumber()
  @IsNotEmpty()
  dwell_time: number;
}
export class ZoneTracksEntryDto {
  @ValidateNested({ each: true })
  @Type(() => TrackRecordDto)
  @IsArray()
  records: TrackRecordDto[];
}
export class ZoneTracksDto {
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ZoneTracksEntryDto)
  zone_tracks: Record<string, ZoneTracksEntryDto>;
}

export class HeatmapItemDto {
  @IsMongoId()
  store: string = '68fb2ed3235867652032728c';
  @IsString()
  camera_id: string;

  @IsNumber()
  timestamp: number;

  @IsArray()
  @IsNumber({}, { each: true })
  grid_count: number[];

  @IsObject()
  zone_count: Record<string, number>;

  @IsObject()
  //   @ValidateNested({ each: true })
  //   @Type(() => TrackRecordDto)
  zone_tracks: Record<string, TrackRecordDto[]>;
}
