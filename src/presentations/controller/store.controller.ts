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
  ConflictException,
  Delete,
} from '@nestjs/common';

import { StoreService } from '../service/store.service';
import { AddStoreDto, DeleteStoreDto, EditStoreDto, GetStoresDto } from '../dto/store';
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
        const { stores, store } = result;
        return { message: 'Store Created', stores, store };
      } else {
        const { error, errorType } = result;
        if (error === 403) {
          throw new ForbiddenException('Cannot create this store');
        } else if (error === 404) {
          if (errorType === 'store') {
            throw new NotFoundException('Store Not Found');
          }
          if (errorType === 'company') {
            throw new NotFoundException('Company Not Registered');
          } else if (errorType === 'region') {
            throw new NotFoundException('Region Not Valid');
          }
        } else if (error === 409) {
          throw new ConflictException('Store With this Name Already Exists');
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
  @Delete('delete-store')
  @UseGuards(AuthGuard)
  async deleteExistingStore(@Body() deleteStoreDto: DeleteStoreDto, @Request() req) {
    try {
      const result = await this.storeService.deleteStore(
        deleteStoreDto.companyId,
        req.user.id,
        deleteStoreDto.storeId
      );
      if (result.success) {
        return {
          message: 'Store Deleted Successfully',
          stores: result.stores.length > 0 ? result.stores : null,
        };
      } else {
        const { error, errorType } = result;
        if (error === 403) {
          throw new ForbiddenException('Cannot delete this store');
        } else if (error === 404) {
          if (errorType === 'store') {
            throw new NotFoundException('Store Not Found');
          }
          if (errorType === 'company') {
            throw new NotFoundException('Store is not related to specific company');
          } else if (errorType === 'region') {
            throw new NotFoundException('Region Not Valid');
          }
        } else if (error === 409) {
          throw new ConflictException('Store With this Name Already Exists');
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
  @Post('edit')
  @UseGuards(AuthGuard)
  async editExistingStore(@Body() EditStoreDto: EditStoreDto, @Request() req) {
    try {
      const { id, ...rest } = EditStoreDto;
      const result = await this.storeService.editExistingStore(rest, req.user.id, id);
      if (result.success) {
        const { stores } = result;
        return { message: 'Store Updated Successfully', stores };
      } else {
        const { error, errorType } = result;

        if (error === 403) {
          throw new ForbiddenException('Cannot edit this store');
        } else if (error === 404) {
          if (errorType === 'store') {
            throw new NotFoundException('Store Not Found');
          }
          if (errorType === 'company') {
            throw new NotFoundException('Company Not Registered');
          } else if (errorType === 'region') {
            throw new NotFoundException('Region Not Valid');
          }
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
