import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from '@infrastructure/modal/store-schema';
import { StoreService } from '@presentations/service/store.service';
import { StoreController } from '../controller/store.controller';
import { CompanyModule } from './company.module';
import { RegionModule } from './region.module';
import { DayWiseStatsModule } from './day-wise-stats.module';

import { HourWiseStatsModule } from './hour-stat.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    CompanyModule,
    RegionModule,
    DayWiseStatsModule,
    HourWiseStatsModule,
  ],
  providers: [StoreService],
  controllers: [StoreController],
  exports: [MongooseModule],
})
export class StoreModule {}
