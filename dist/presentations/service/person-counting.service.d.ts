import { PersonStatsType } from '@utils/types/person-stats-type';
export declare class PersonCountingService {
    private readonly personStats;
    getStats(): Promise<{
        success: true;
        data: PersonStatsType;
    } | {
        success: false;
        err: string;
    }>;
}
