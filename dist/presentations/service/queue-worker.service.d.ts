import { OnModuleInit } from '@nestjs/common';
import { RedisService } from '@src/utils/shared/redis/redis.service';
export declare class HeatmapStreamWorker implements OnModuleInit {
    private readonly redis;
    private lastId;
    constructor(redis: RedisService);
    onModuleInit(): Promise<void>;
    startWorker(): Promise<void>;
}
