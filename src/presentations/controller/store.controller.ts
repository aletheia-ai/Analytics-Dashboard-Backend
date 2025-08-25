import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
} from '@nestjs/common';

import { StoreService } from '../service/store.service';
import { AddStoreDto } from '../dto/store';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('add')
  async addNewStore(@Body() addStoreDto: AddStoreDto) {
    try {
      const result = await this.storeService.addNewStore(addStoreDto);
      if (result.success) {
        return { message: 'Store Created' };
      } else {
        const { error } = result;
        console.log(error);
        if (error === 11000) {
          throw new ConflictException('Store with this ID already exists');
        } else if (error === 404) {
          console.log('hello world');
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
