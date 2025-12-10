import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';

import { RestaurantAnalyticsService } from '../service/restaurant-analytics.service';
import { AddEntryDto } from '../dto/restaurant-analytics';

@Controller('restaurant-analytics')
export class RestaurantAnalyticsController {
  constructor(private readonly restaurantAnalyticsService: RestaurantAnalyticsService) {}

  @Post('add-entry')
  @HttpCode(HttpStatus.OK)
  async addEntry(@Body() addEntryDto: AddEntryDto) {
    try {
      const result = await this.restaurantAnalyticsService.addAnalyticsEntry(addEntryDto);
      if (result.success) {
        return 'hello world';
      } else {
        if (result.error === 404) {
          if (result.errorType === 'other') {
            throw new NotFoundException('Not Found');
          } else {
            throw new NotFoundException('Store Not Found');
          }
        } else {
          throw new InternalServerErrorException('Something went wrong');
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
