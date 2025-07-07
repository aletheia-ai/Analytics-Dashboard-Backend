import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  @HttpCode(200)
  findAll(): string {
    return 'Heo orld';
  }
}
