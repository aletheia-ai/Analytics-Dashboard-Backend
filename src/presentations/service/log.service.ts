import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AppGateway } from '@src/utils/shared/socket';
import { Model } from 'mongoose';

@Injectable()
export class LogService {
  constructor(
    @InjectModel('Log') private log: Model<any>,
    private readonly appGateway: AppGateway
  ) {}

  async addLogs(obj: {
    logs: string;
    status: string;
    label: string;
  }): Promise<{ success: boolean }> {
    try {
      await this.log.updateOne({ label: obj.label }, { $set: { ...obj } }, { upsert: true });
      this.appGateway.handleProductStats(obj, 'abc');
      //   await data.save();
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  }

  async getRecentLogs(): Promise<
    { success: true; data: any[] } | { success: false; error: number }
  > {
    try {
      const data = await this.log.find();
      if (data) {
        return { success: true, data };
      } else {
        return { success: false, error: 404 };
      }
    } catch {
      return { success: false, error: 500 };
    }
  }
}
