import { PeopleCountingType } from '@src/utils/types/people-counting-type';
import { Model } from 'mongoose';
import { Store } from '@src/utils/types/store-type';
import { StatsType } from '@src/utils/types/stats-type';
import { AppGateway } from '@src/utils/shared/socket';
export declare class PersonCountingService {
    private personCounting;
    private store;
    private stats;
    private readonly appGateway;
    constructor(personCounting: Model<PeopleCountingType>, store: Model<Store>, stats: Model<StatsType>, appGateway: AppGateway);
    addEntry(data: PeopleCountingType): Promise<{
        success: true;
    } | {
        success: false;
        error: number;
    }>;
    getStats(store: string): Promise<{
        success: true;
        data: PeopleCountingType;
    } | {
        success: false;
        error: number;
    }>;
}
