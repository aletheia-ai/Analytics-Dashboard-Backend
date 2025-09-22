import { PersonCountingService } from '@presentations/service/person-counting.service';
import { AddEntryDto, GetStatsDto } from '../dto/person-counting';
export declare class PersonCountingController {
    private personCounting;
    constructor(personCounting: PersonCountingService);
    getStatistics(getStatsDto: GetStatsDto): Promise<{
        message: import("../../utils/types/people-counting-type").PeopleCountingType;
    }>;
    addEntry(addEntryDto: AddEntryDto): Promise<{
        message: string;
    }>;
}
