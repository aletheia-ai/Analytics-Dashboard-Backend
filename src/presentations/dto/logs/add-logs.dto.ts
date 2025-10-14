import { IsNotEmpty, IsMongoId, IsString, IsOptional } from 'class-validator';

// "logs":"string",
//  "label":"pizza"  //"bottle",
// "status":"presence"//"absence",
// }
export class AddLogsDto {
  @IsString()
  @IsOptional()
  logs: string;

  @IsString()
  @IsNotEmpty()
  label: string = 'bottle';

  @IsString()
  @IsNotEmpty()
  status: string = 'absence';
}
