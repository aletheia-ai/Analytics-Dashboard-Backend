import { Model } from 'mongoose';
import { HeatmapItemType } from '@src/utils/types/heatmap-item-type';
import { RedisService } from '@src/utils/shared/redis/redis.service';
export declare class HeatmapService {
    private heatmapModel;
    private readonly redis;
    constructor(heatmapModel: Model<HeatmapItemType>, redis: RedisService);
    addHeatmapItem(data: HeatmapItemType): Promise<{
        success: true;
    } | {
        success: false;
        error: number;
    }>;
}
