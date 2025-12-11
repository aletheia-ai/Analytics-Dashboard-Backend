import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { type User } from '@utils/types';
import * as dotenv from 'dotenv';
import { HeatmapItemType } from '@src/utils/types/heatmap-item-type';
import { RedisService } from '@src/utils/shared/redis/redis.service';

dotenv.config();

@Injectable()
export class HeatmapService {
  constructor(
    @InjectModel('Heat_Maps') private heatmapModel: Model<HeatmapItemType>,
    private readonly redis: RedisService
  ) {}

  //   async getHeatmap(timestamp: number) {
  //     return await this.redis.get(`heatmap:cam501:minute:${timestamp}`);
  //   }
  async addHeatmapItem(
    data: HeatmapItemType
  ): Promise<{ success: true } | { success: false; error: number }> {
    try {
      return { success: true };
    } catch (err) {
      return { success: false, error: err.code | 500 };
    }
  }
}
