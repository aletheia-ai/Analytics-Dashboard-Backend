import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeatmapItemSchema } from '@infrastructure/modal/heatmap.schema';
import { SocketModule } from './socket.module';
import { HeatmapController } from '../controller/heat-maps.controller';
import { HeatmapService } from '../service/heatmap.service';
import { RedisModule } from '@src/utils/shared/redis/redis.module';
// import { HeatmapListenerService } from '../service/heatmap-listener.service';
import { HeatmapStreamWorker } from '../service/queue-worker.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Heat_Maps', schema: HeatmapItemSchema }]),
    RedisModule,
    SocketModule,
  ],
  controllers: [HeatmapController],
  providers: [HeatmapService, HeatmapStreamWorker],
  exports: [MongooseModule],
})
export class HeatMapsModule {}
