//src/utils/shared/redis/redis.module.ts
import { Module } from '@nestjs/common';
import { createClient } from 'redis';
import { RedisService } from './redis.service';

const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: async () => {
    const client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => {
          const delay = Math.min(retries * 50, 2000);
          console.log(' 🔁 Redis reconnect attempt #${retries}, retrying in ${delay}ms');
          return delay;
        },
      },
    });

    console.log('🔍 Connecting to Redis with URL:', process.env.REDIS_URL);

    client.on('connect', () => console.log('✅ Redis connected'));
    client.on('ready', () => console.log('🚀 Redis ready'));
    client.on('reconnecting', () => console.log('🔁 Redis reconnecting...'));
    client.on('end', () => console.warn('❌ Redis connection closed'));
    client.on('error', (err) => {
      console.error('❌ Redis error:', err);
    });

    try {
      await client.connect();
      const pong = await client.ping();
      console.log('📶 Redis PING response:', pong);
    } catch (err) {
      console.error('❌ Failed to connect to Redis:', err);
      throw err;
    }
    return client;
  },
};

@Module({
  providers: [RedisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
