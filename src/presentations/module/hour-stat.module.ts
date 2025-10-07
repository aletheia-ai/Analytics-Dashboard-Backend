import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HourWiseStatsSchema } from '@src/infrastructure/modal/hour-stats.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Hour_Wise_Stats', schema: HourWiseStatsSchema }])],

  exports: [MongooseModule],
})
export class HourWiseStatsModule {}
