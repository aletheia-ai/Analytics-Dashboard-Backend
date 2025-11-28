import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisService } from '@src/utils/shared/redis/redis.service';

@Injectable()
export class HeatmapStreamWorker implements OnModuleInit {
  private lastId = '0'; // start from the beginning of the stream

  constructor(private readonly redis: RedisService) {}

  async onModuleInit() {
    console.log('📥 Heatmap Stream Worker started...');
    this.startWorker();
  }

  async startWorker() {
    const streamKey = 'heatmap:cam501:minute'; // example stream key
    console.log('Worker running...');

    while (true) {
      try {
        const messages = await this.redis.readStream(streamKey, this.lastId, 0);
        if (messages.length) {
          for (const streamData of messages) {
            console.log('🔥 Stream message ID:', streamData.id);

            // iterate over object entries
            for (const [field, value] of Object.entries(streamData.message)) {
              console.log(`Field: ${field}, Value:`, value);
            }

            // update lastId so next XREAD starts after this message
            this.lastId = streamData.id;
          }
        }
      } catch (err) {
        console.error('❌ Stream read error:', err);
      }
    }
  }
}
