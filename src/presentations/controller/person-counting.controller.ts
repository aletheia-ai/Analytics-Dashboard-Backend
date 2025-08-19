import {
  Controller,
  HttpCode,
  InternalServerErrorException,
  Get,
  HttpException,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@utils/guards/auth.guard.';
import { PersonCountingService } from '@presentations/service/person-counting.service';

@Controller('person-counting')
export class PersonCountingController {
  constructor(private personCounting: PersonCountingService) {}
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('stats')
  async getStatistics() {
    try {
      const result = await this.personCounting.getStats();
      if (result.success) {
        return { message: result.data };
      } else {
        return { message: result.err };
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }
}
