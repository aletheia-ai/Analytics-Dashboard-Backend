import {
  Body,
  Param,
  Controller,
  Post,
  HttpCode,
  InternalServerErrorException,
  Get,
  NotFoundException,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@utils/guards/auth.guard.';
import { CreateUserDto, GetUserDto } from '@presentations/dto/user';
import { UserService } from '@presentations/service/user.service';
import { User } from '@src/utils/types';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  // @Post('create-user')
  // @HttpCode(200)
  // async Create(@Body() createUserDto: CreateUserDto): Promise<any[]> {
  //   try {
  //     await this.userService.create(createUserDto);
  //     const data = await this.userService.findAll();
  //     return data;
  //   } catch (err) {
  //     throw new InternalServerErrorException();
  //   }
  // }

  // @Get('get-user/:email')
  // @HttpCode(200)
  // @UseGuards(AuthGuard)
  // async getUser(@Param() { email }: GetUserDto): Promise<User> {
  //   try {
  //     const result = await this.userService.getAllUsers(email);
  //     if (result.success) {
  //       return result.data;
  //     } else {
  //       throw new HttpException('Not Found', 404);
  //     }
  //   } catch (err) {
  //     if (err instanceof HttpException) {
  //       throw new HttpException(err.message, err.getStatus());
  //     }
  //     throw new InternalServerErrorException();
  //   }
  // }
}
