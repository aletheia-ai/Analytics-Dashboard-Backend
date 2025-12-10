import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RestaurantAnalyticsSchema } from '@src/infrastructure/modal/restaurant-analytics.schema';
import { RestaurantAnalyticsService } from '../service/restaurant-analytics.service';
import { RestaurantAnalyticsController } from '../controller/restaurant.analytics.controller';
import { StoreModule } from './store.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Restaurant-Analytics', schema: RestaurantAnalyticsSchema },
    ]),
    StoreModule,
  ],
  providers: [RestaurantAnalyticsService],
  controllers: [RestaurantAnalyticsController],
  exports: [MongooseModule],
})
export class RestauranAnalyticsModule {}
