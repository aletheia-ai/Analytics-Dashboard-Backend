import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Get,
} from '@nestjs/common';

import { LogService } from '../service/log.service';
import { AddLogsDto } from '../dto/logs/add-logs.dto';

@Controller('productiondetection')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post('addLogs')
  @HttpCode(HttpStatus.OK)
  async addLogs(@Body() addLogDto: AddLogsDto) {
    try {
      const { success } = await this.logService.addLogs(addLogDto);
      if (success) {
        return { message: 'Log Added' };
      } else {
        throw new InternalServerErrorException('Something Went Wrong');
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something Went Wrong');
    }
  }

  @Get('get-logs')
  @HttpCode(HttpStatus.OK)
  async getRecentLogs() {
    try {
      const result = await this.logService.getRecentLogs();
      if (result.success) {
        return { message: result.data };
      } else {
        return { message: [] };
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message || 'Something Went Wrong');
    }
  }
}
