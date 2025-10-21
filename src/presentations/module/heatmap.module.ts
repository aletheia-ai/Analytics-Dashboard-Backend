import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductStatsSchema } from '@infrastructure/modal/product-stats.schema';
import { AppGateway } from '@src/utils/shared/socket';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Heat_Maps', schema: ProductStatsSchema }]),
    AppGateway,
  ],
  providers: [AppGateway],
  exports: [MongooseModule],
})
export class HeatMapsModule {}
