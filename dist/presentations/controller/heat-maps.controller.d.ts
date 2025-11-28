import { HeatmapItemDto } from '../dto/heatmap/add-entry.dto';
import { HeatmapService } from '../service/heatmap.service';
export declare class HeatmapController {
    private heatmaps;
    constructor(heatmaps: HeatmapService);
    addNewHeatmap(addStoreDto: HeatmapItemDto, req: any): Promise<HeatmapItemDto>;
    getHeatmap(timestamp: number): Promise<void>;
}
