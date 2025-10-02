import {
  Param,
  Controller,
  HttpCode,
  Get,
  UseGuards,
  HttpStatus,
  NotFoundException,
  InternalServerErrorException,
  HttpException,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@utils/guards/auth.guard.';
import { EditUserByIdDto, GetUserByIdDto } from '@presentations/dto/user';
import { UserService } from '@presentations/service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch('edit-user')
  async updateUser(@Body() editUserDto: EditUserByIdDto) {
    try {
      const result = await this.userService.editUser(editUserDto);
      if (result.success) {
        return { message: 'User Updated Successfully', data: result.data };
      } else {
        const { error } = result;
        if (error === 404) {
          throw new NotFoundException('User Not Found');
        } else {
          throw new InternalServerErrorException('Something Went wrong');
        }
      }
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('user-by-id/:userId')
  async getUserById(@Param() getuserById: GetUserByIdDto) {
    try {
      const result = await this.userService.findUserById(getuserById.userId);
      if (result.success) {
        const { firstName, lastName, email, userType } = result.data;

        return { message: { firstName, lastName, email, userType } };
      } else {
        if (result.error === 404) {
          throw new NotFoundException('User Not Found');
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
}
