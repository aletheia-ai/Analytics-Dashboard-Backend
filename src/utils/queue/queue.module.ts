//src/utils/queue/queue.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
// import { Queue } from 'bullmq';
// import { RedisOptions } from 'ioredis';
import { QueueService } from './queue.service';
import * as dotenv from 'dotenv';
dotenv.config();
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'test',
      connection: { url: redisUrl },
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
