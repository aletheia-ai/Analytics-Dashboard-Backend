//src/utils/shared/redis/redis.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) {}

  async blockingPop(queueName: string, timeout = 0): Promise<any> {
    return await this.redisClient.sendCommand(['BRPOP', queueName, timeout.toString()]);
  }

  async pushToQueue(queueName: string, message: any): Promise<void> {
    await this.redisClient.lPush(queueName, JSON.stringify(message));
  }
  async clearQueue(queueName: string): Promise<void> {
    await this.redisClient.del(queueName);
  }
}
