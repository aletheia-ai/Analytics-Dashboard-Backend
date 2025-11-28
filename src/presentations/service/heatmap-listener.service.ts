// heatmap-stream-listener.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '@src/utils/shared/redis/redis.service';
// import { RedisService } from './redis.service'; // or your RedisStreamService

@Injectable()
export class HeatmapStreamListener implements OnModuleInit {
  private lastId = '0'; // start from beginning of stream

  constructor(private readonly redis: RedisService) {}

  async onModuleInit() {
    console.log('📥 Heatmap Stream Listener started...');
    this.startListening();
  }

  async startListening() {
    const streamKey = 'heatmap:cam501:minute'; // example stream

    while (true) {
      try {
        const messages = await this.redis.readStream(streamKey, this.lastId, 0);
        for (const msg of messages) {
          console.log('🔥 Stream message ID:', msg.id);
          console.log('Data:', msg.message);

          // Update lastId for next XREAD
          this.lastId = msg.id;
        }
      } catch (err) {
        console.error('❌ Stream read error:', err);
        await new Promise((r) => setTimeout(r, 1000)); // retry after 1s
      }
    }
  }
}
