import { LogService } from '../service/log.service';
import { AddLogsDto } from '../dto/logs/add-logs.dto';
export declare class LogController {
    private readonly logService;
    constructor(logService: LogService);
    addLogs(addLogDto: AddLogsDto): Promise<{
        message: string;
    }>;
    getRecentLogs(): Promise<{
        message: any[];
    }>;
}
