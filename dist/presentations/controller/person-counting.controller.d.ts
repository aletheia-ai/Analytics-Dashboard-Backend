import { PersonCountingService } from '@presentations/service/person-counting.service';
export declare class PersonCountingController {
    private personCounting;
    constructor(personCounting: PersonCountingService);
    getStatistics(): Promise<{
        message: import("../../utils/types").PersonStatsType;
    } | {
        message: string;
    }>;
}
