import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType<any, any>) {}

  /**
   * Add message to a stream
   */
  async addToStream(stream: string, message: Record<string, any>): Promise<string> {
    const entries: string[] = [];

    for (const [key, value] of Object.entries(message)) {
      entries.push(key, typeof value === 'string' ? value : JSON.stringify(value));
    }

    try {
      const id = (await this.redisClient.sendCommand(['XADD', stream, '*', ...entries])) as string;

      return id;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Read from a stream
   */
  async readStream(
    stream: string,
    lastId: string = '$',
    block: number = 0
  ): Promise<{ id: string; message: Record<string, any> }[]> {
    const result = await this.redisClient.sendCommand([
      'XREAD',
      'BLOCK',
      block.toString(),
      'COUNT',
      '100',
      'STREAMS',
      stream,
      lastId,
    ]);

    if (!result) return [];

    const messages: { id: string; message: Record<string, any> }[] = [];

    const entriesArray = result as unknown as any[]; // cast through unknown first

    if (Array.isArray(entriesArray)) {
      for (const streamEntry of entriesArray) {
        if (!Array.isArray(streamEntry) || streamEntry.length < 2) continue;
        const [, streamMessages] = streamEntry;
        if (!Array.isArray(streamMessages)) continue;

        for (const [id, kvArray] of streamMessages) {
          const message: Record<string, any> = {};
          for (let i = 0; i < kvArray.length; i += 2) {
            const key = kvArray[i];
            const value = kvArray[i + 1];
            try {
              message[key] = JSON.parse(value);
            } catch {
              message[key] = value;
            }
          }
          messages.push({ id, message });
        }
      }
    }

    return messages;
  }

  /**
   * Create consumer group
   */
  async createConsumerGroup(stream: string, group: string) {
    try {
      await this.redisClient.sendCommand(['XGROUP', 'CREATE', stream, group, '$', 'MKSTREAM']);
    } catch (err: any) {
      if (!err.message.includes('BUSYGROUP')) {
        throw err;
      }
    }
  }

  /**
   * Read stream with consumer group
   */
  async readStreamGroup(
    group: string,
    consumer: string,
    stream: string,
    lastId: string = '>'
  ): Promise<{ id: string; message: Record<string, any> }[]> {
    const result = await this.redisClient.sendCommand([
      'XREADGROUP',
      'GROUP',
      group,
      consumer,
      'BLOCK',
      '0',
      'STREAMS',
      stream,
      lastId,
    ]);

    if (!result) return [];
    const messages: { id: string; message: Record<string, any> }[] = [];

    if (Array.isArray(result)) {
      for (const streamEntry of result) {
        // streamEntry format: [streamKey, [[id, [key1, val1, key2, val2]]]]
        if (!Array.isArray(streamEntry) || streamEntry.length < 2) continue;

        const [, entries] = streamEntry;
        if (!Array.isArray(entries)) continue;

        for (const entry of entries) {
          if (!Array.isArray(entry) || entry.length < 2) continue;

          const [id, kvArray] = entry;
          const message: Record<string, any> = {};

          if (Array.isArray(kvArray)) {
            for (let i = 0; i < kvArray.length; i += 2) {
              const key = kvArray[i];
              const value = kvArray[i + 1];
              try {
                message[key] = JSON.parse(value);
              } catch {
                message[key] = value;
              }
            }
          }

          messages.push({ id, message });
        }
      }
    }

    return messages;
  }
}
