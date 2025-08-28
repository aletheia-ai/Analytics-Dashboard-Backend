import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { StoreService } from '../service/store.service';
import { AddStoreDto } from '../dto/store';
import { AuthGuard } from '@src/utils/guards/auth.guard.';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  @UseGuards(AuthGuard)
  async addNewStore(@Body() addStoreDto: AddStoreDto, @Request() req) {
    try {
      const result = await this.storeService.addNewStore(addStoreDto, req.user.id);
      if (result.success) {
        return { message: 'Store Created' };
      } else {
        const { error } = result;

        if (error === 403) {
          throw new ForbiddenException('Cannot create this store');
        } else if (error === 404) {
          throw new NotFoundException('Company Not Registered');
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
