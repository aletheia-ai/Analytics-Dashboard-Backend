// heatmap-producer.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '@src/utils/shared/redis/redis.service';
// import { RedisService } from './redis.service';

@Injectable()
export class HeatmapProducerService implements OnModuleInit {
  constructor(private readonly redis: RedisService) {}

  async onModuleInit() {
    setInterval(async () => {
      const msg = {
        camera_id: 'cam501',
        timestamp: Date.now(),
        data: { heat: Math.floor(Math.random() * 100) },
        world: 'hello',
      };
      const id = await this.redis.addToStream('heatmap:cam501:minute', msg);
      console.log('✅ Added message to stream:', id, msg);
    }, 3000);
  }
}
