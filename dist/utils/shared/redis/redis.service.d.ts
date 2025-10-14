import { RedisClientType } from 'redis';
export declare class RedisService {
    private readonly redisClient;
    constructor(redisClient: RedisClientType);
    blockingPop(queueName: string, timeout?: number): Promise<any>;
    pushToQueue(queueName: string, message: any): Promise<void>;
    clearQueue(queueName: string): Promise<void>;
}
