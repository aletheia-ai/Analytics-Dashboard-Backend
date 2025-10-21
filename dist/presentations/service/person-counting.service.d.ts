import { PeopleCountingType } from '@src/utils/types/people-counting-type';
import { Model } from 'mongoose';
import { Store } from '@src/utils/types/store-type';
import { StatsType } from '@src/utils/types/stats-type';
import { AppGateway } from '@src/utils/shared/socket';
import { RangeType } from '@src/utils/types/range-type';
import { DayWiseStatsType } from '@src/utils/types/day-wise-stat-type';
import { HourWiseStatsType } from '@src/utils/types/hour-stat.type';
export declare class PersonCountingService {
    private personCounting;
    private store;
    private stats;
    private dayWiseStats;
    private hourWiseStats;
    private readonly appGateway;
    constructor(personCounting: Model<PeopleCountingType>, store: Model<Store>, stats: Model<StatsType>, dayWiseStats: Model<DayWiseStatsType>, hourWiseStats: Model<HourWiseStatsType>, appGateway: AppGateway);
    addEntry(data: PeopleCountingType): Promise<{
        success: true;
    } | {
        success: false;
        error: number;
    }>;
    getStats(store: string[], range: RangeType): Promise<{
        success: true;
        data: PeopleCountingType;
    } | {
        success: false;
        error: number;
    }>;
    getDayWiseStats(store: string[]): Promise<{
        success: true;
        data: DayWiseStatsType[];
    } | {
        success: false;
        error: number;
    }>;
    getHourWiseStats(store: string[]): Promise<{
        success: true;
        data: HourWiseStatsType[];
    } | {
        success: false;
        error: number;
    }>;
    getCurrentHourStats(store: string[]): Promise<{
        success: true;
        data: {
            age_0_9_Count: number;
            age_10_18_Count: number;
            age_19_34_Count: number;
            age_35_60_Count: number;
            age_60plus_Count: number;
            enterCount: number;
        };
    } | {
        success: false;
        error: number;
    }>;
}
