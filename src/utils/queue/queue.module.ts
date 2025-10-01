import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
// import { Queue } from 'bullmq';
import { RedisOptions } from 'ioredis';
import { QueueService } from './queue.service';

const redisOptions: RedisOptions = {
  host: '127.0.0.1',
  port: 6379,
};

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'test',
      connection: redisOptions,
    }),
  ],
  providers: [QueueService],
  exports: [QueueService],
})
export class QueueModule {}
