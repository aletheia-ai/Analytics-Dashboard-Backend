import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('test') private readonly emailQueue: Queue) {}

  async addEmailJob(data: any) {
    console.log(data);
    return this.emailQueue.add('sendEmail', data, {
      attempts: 3,
      backoff: 5000,
    });
  }

  async addDelayedEmail(data: any, delayMs: number) {
    return this.emailQueue.add('sendEmail', data, {
      delay: delayMs,
    });
  }
}
