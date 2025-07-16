import { Body, Controller, Post, HttpCode, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '@presentations/dto/user';
import { UserService } from '@presentations/service/user.service';
import { User } from '@src/utils/types';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create-user')
  @HttpCode(200)
  async Create(@Body() createUserDto: CreateUserDto): Promise<any[]> {
    try {
      await this.userService.create(createUserDto);
      const data = await this.userService.findAll();
      return data;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
