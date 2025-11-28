import { OnModuleInit } from '@nestjs/common';
import { RedisService } from '@src/utils/shared/redis/redis.service';
export declare class HeatmapProducerService implements OnModuleInit {
    private readonly redis;
    constructor(redis: RedisService);
    onModuleInit(): Promise<void>;
}
