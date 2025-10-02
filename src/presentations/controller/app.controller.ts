import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { AppService } from '@applications/use-case/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HttpCode(HttpStatus.OK)
  @Get('test')
  checkServer() {
    try {
      return { message: 'Server Runing' };
    } catch {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
