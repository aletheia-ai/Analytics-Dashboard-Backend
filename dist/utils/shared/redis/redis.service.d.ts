import { RedisClientType } from 'redis';
export declare class RedisService {
    private readonly redisClient;
    constructor(redisClient: RedisClientType<any, any>);
    addToStream(stream: string, message: Record<string, any>): Promise<string>;
    readStream(stream: string, lastId?: string, block?: number): Promise<{
        id: string;
        message: Record<string, any>;
    }[]>;
    createConsumerGroup(stream: string, group: string): Promise<void>;
    readStreamGroup(group: string, consumer: string, stream: string, lastId?: string): Promise<{
        id: string;
        message: Record<string, any>;
    }[]>;
}
