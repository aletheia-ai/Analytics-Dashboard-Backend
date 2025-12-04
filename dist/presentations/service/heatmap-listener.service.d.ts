import { OnModuleInit } from '@nestjs/common';
import { RedisService } from '@src/utils/shared/redis/redis.service';
import { HeatmapItemType } from '@src/utils/types/heatmap-item-type';
import { Model } from 'mongoose';
export declare class HeatmapStreamListener implements OnModuleInit {
    private readonly redis;
    private heatmap;
    private lastId;
    constructor(redis: RedisService, heatmap: Model<HeatmapItemType>);
    onModuleInit(): Promise<void>;
    startListening(): Promise<void>;
}
