import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StoreService } from '@presentations/service/store.service';
import { StoreController } from '../controller/store.controller';

import { RestaurantAnalyticsSchema } from '@src/infrastructure/modal/restaurant-analytics.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Restaurant-Analytics', schema: RestaurantAnalyticsSchema },
    ]),
  ],
  providers: [StoreService],
  controllers: [StoreController],
  exports: [MongooseModule],
})
export class RestauranAnalyticsModule {}
