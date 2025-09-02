import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';

import { RegionService } from '../service/region.service';
import { AuthGuard } from '@src/utils/guards/auth.guard.';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  @UseGuards(AuthGuard)
  async getAllRegions() {
    try {
      const result = await this.regionService.getAllRegions();
      if (result.success) {
        return { message: result.data };
      } else {
        if (result.error == 404) {
          throw new NotFoundException('Regions Found');
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
