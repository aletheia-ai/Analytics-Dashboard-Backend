import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { HeatmapItemDto } from '../dto/heatmap/add-entry.dto';
import { HeatmapService } from '../service/heatmap.service';

@Controller('heatmap')
export class HeatmapController {
  constructor(private heatmaps: HeatmapService) {}

  @HttpCode(HttpStatus.OK)
  @Post('add-entry')
  async addNewHeatmap(@Body() addStoreDto: HeatmapItemDto, @Request() req) {
    try {
      this.heatmaps.addHeatmapItem(addStoreDto);
      return addStoreDto;
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get('heat-map')
  async getHeatmap(@Query('timestamp') timestamp: number) {
    console.log('hello');
    // return this.heatmaps.getHeatmap(timestamp);
  }
}
