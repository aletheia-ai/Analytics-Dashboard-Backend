import { RedisService } from '@src/utils/shared/redis/redis.service';
export declare class HeatmapStreamWorker {
    private readonly redis;
    private lastId;
    constructor(redis: RedisService);
}
