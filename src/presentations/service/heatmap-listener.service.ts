// heatmap-stream-listener.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RedisService } from '@src/utils/shared/redis/redis.service';
import { HeatmapItemType } from '@src/utils/types/heatmap-item-type';
import { Model, Types } from 'mongoose';
// import { RedisService } from './redis.service'; // or your RedisStreamService

@Injectable()
export class HeatmapStreamListener implements OnModuleInit {
  private lastId = '0';

  constructor(
    private readonly redis: RedisService,
    @InjectModel('Heat_Maps') private heatmap: Model<HeatmapItemType>
  ) {}

  async onModuleInit() {
    this.startListening();
  }

  async startListening() {
    const streamKey = 'heatmap:cam501:minute';

    while (true) {
      try {
        const messages = await this.redis.readStream(streamKey, this.lastId, 0);
        const store = new this.heatmap({
          store: new Types.ObjectId('68fb2ed3235867652032728c'),
          grid_count: [],
          camera_id: '503',
          timestamp: 1234567,
        });
        await store.save();
        for (const msg of messages) {
          console.log('🔥 Stream message ID:', msg.id);
          // console.log('Data:', msg.message);

          this.lastId = msg.id;
        }
      } catch (err) {
        console.error('❌ Stream read error:', err);
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }
}
