import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductStatsSchema } from '@infrastructure/modal/product-stats.schema';

import { SocketModule } from './socket.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product_Stats', schema: ProductStatsSchema }]),
    SocketModule,
  ],

  exports: [MongooseModule],
})
export class StatsModule {}
