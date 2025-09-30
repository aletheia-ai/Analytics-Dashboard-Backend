import {
  Controller,
  HttpCode,
  InternalServerErrorException,
  Get,
  HttpException,
  UseGuards,
  HttpStatus,
  Body,
  Post,
  NotFoundException,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@utils/guards/auth.guard.';
import { PersonCountingService } from '@presentations/service/person-counting.service';
import { AddEntryDto, GetStatsDto } from '../dto/person-counting';

@Controller('person-counting')
export class PersonCountingController {
  constructor(private personCounting: PersonCountingService) {}
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('stats')
  async getStatistics(@Body() getStatsDto: GetStatsDto) {
    try {
      const result = await this.personCounting.getStats(getStatsDto.store);
      if (result.success) {
        return { message: result.data };
      } else {
        const { error } = result;
        if (error === 404) {
          throw new NotFoundException();
        } else {
          throw new InternalServerErrorException();
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('add-entry')
  async addEntry(@Body() addEntryDto: AddEntryDto) {
    try {
      const result = await this.personCounting.addEntry(addEntryDto);
      if (result.success) {
        return { message: 'Entry Added Successfully' };
      } else {
        const { error } = result;
        if (error === 404) {
          throw new NotFoundException('Store Not Found');
        } else if (error === 401) {
          throw new BadRequestException();
        } else {
          throw new InternalServerErrorException('Something went wrong');
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('day-wise-stats')
  @UseGuards(AuthGuard)
  async getStats(@Body() getStatsDto: GetStatsDto) {
    try {
      const result = await this.personCounting.getDayWiseStats(getStatsDto.store);

      if (result.success) {
        return { message: result.data };
      } else {
        throw new InternalServerErrorException('Something Went wrong');
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('hour-wise-stats')
  @UseGuards(AuthGuard)
  async getHourWiseStats(@Body() getStatsDto: GetStatsDto) {
    try {
      const result = await this.personCounting.getHourWiseStats(getStatsDto.store[0]);

      if (result.success) {
        return { message: result.data };
      } else {
        throw new InternalServerErrorException('Something Went wrong');
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('current-hour-stats')
  @UseGuards(AuthGuard)
  async getCurrentHourStats(@Body() getStatsDto: GetStatsDto) {
    try {
      const result = await this.personCounting.getCurrentHourStats(getStatsDto.store);

      if (result.success) {
        return { message: result.data };
      } else {
        throw new InternalServerErrorException('Something Went wrong');
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }
}
