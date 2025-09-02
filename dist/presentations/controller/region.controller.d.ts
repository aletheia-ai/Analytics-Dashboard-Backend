import { RegionService } from '../service/region.service';
export declare class RegionController {
    private readonly regionService;
    constructor(regionService: RegionService);
    getAllRegions(): Promise<{
        message: import("../../utils/types/region-type").Region[];
    }>;
}
