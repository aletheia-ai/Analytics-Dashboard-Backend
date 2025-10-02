import { PersonCountingService } from '@presentations/service/person-counting.service';
import { AddEntryDto, GetStatsDto, GetTimelyStatsDto } from '../dto/person-counting';
export declare class PersonCountingController {
    private personCounting;
    constructor(personCounting: PersonCountingService);
    getStatistics(getStatsDto: GetTimelyStatsDto): Promise<{
        message: import("../../utils/types/people-counting-type").PeopleCountingType;
    }>;
    addEntry(addEntryDto: AddEntryDto): Promise<{
        message: string;
    }>;
    getStats(getStatsDto: GetStatsDto): Promise<{
        message: import("../../utils/types/day-wise-stat-type").DayWiseStatsType[];
    }>;
    getHourWiseStats(getStatsDto: GetStatsDto): Promise<{
        message: import("../../utils/types/hour-stat.type").HourWiseStatsType[];
    }>;
    getCurrentHourStats(getStatsDto: GetStatsDto): Promise<{
        message: {
            age_0_9_Count: number;
            age_10_18_Count: number;
            age_19_34_Count: number;
            age_35_60_Count: number;
            age_60plus_Count: number;
            enterCount: number;
        };
    }>;
}
