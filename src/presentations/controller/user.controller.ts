import {
  Body,
  Controller,
  Post,
  HttpCode,
  PreconditionFailedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from '@presentations/dto/user';
@Controller('user')
export class UserController {
  @Post()
  @HttpCode(200)
  // @UsePipes(ValidationPipe)
  Create(@Body() createUserDto: CreateUserDto): string {
    try {
      console.log(createUserDto);
      return 'Heo orld';
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
