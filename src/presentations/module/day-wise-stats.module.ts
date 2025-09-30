import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { ProductStatsSchema } from '@infrastructure/modal/product-stats.schema';
import { DayWiseStatsSchema } from '@src/infrastructure/modal/day-wise-stat';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Day Wise Stats', schema: DayWiseStatsSchema }])],

  exports: [MongooseModule],
})
export class DayWiseStatsModule {}
