import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import type { Region } from '@utils/types/region-type';
export declare class RegionService implements OnModuleInit {
    private readonly regionModel;
    private readonly logger;
    constructor(regionModel: Model<Region>);
    onModuleInit(): Promise<void>;
    private getAwsRegions;
}
