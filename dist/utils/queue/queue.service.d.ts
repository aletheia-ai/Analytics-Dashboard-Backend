import { Queue } from 'bullmq';
export declare class QueueService {
    private readonly emailQueue;
    constructor(emailQueue: Queue);
    addEmailJob(data: any): Promise<import("bullmq").Job<any, any, string>>;
    addDelayedEmail(data: any, delayMs: number): Promise<import("bullmq").Job<any, any, string>>;
}
