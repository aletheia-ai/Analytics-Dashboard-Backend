import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Get,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';

import { StoreService } from '../service/store.service';
import { AddStoreDto, GetStoresDto } from '../dto/store';
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
        console.log(error);

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

  @HttpCode(HttpStatus.OK)
  @Get('all/:company')
  @UseGuards(AuthGuard)
  async getAllStores(@Param() getStoresDto: GetStoresDto) {
    try {
      const result = await this.storeService.getAllStores(getStoresDto.company);
      if (result.success) {
        return { message: result.data };
      } else {
        const { error, errorFrom } = result;

        if (error === 403) {
          throw new ForbiddenException('Cannot Fetch stores');
        } else if (error === 404) {
          throw new NotFoundException(
            `${errorFrom === 'Company' ? 'Company' : 'Store(s)'} 'Not Registered`
          );
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
