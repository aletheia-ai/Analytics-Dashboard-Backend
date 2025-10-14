import { AppGateway } from '@src/utils/shared/socket';
import { Model } from 'mongoose';
export declare class LogService {
    private log;
    private readonly appGateway;
    constructor(log: Model<any>, appGateway: AppGateway);
    addLogs(obj: {
        logs: string;
        status: string;
        label: string;
    }): Promise<{
        success: boolean;
    }>;
    getRecentLogs(): Promise<{
        success: true;
        data: any[];
    } | {
        success: false;
        error: number;
    }>;
}
