import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { PeopleCountingType } from '@src/utils/types/people-counting-type';
import { Model, Types } from 'mongoose';
import { Store } from '@src/utils/types/store-type';
import { StatsType } from '@src/utils/types/stats-type';
import { AppGateway } from '@src/utils/shared/socket';

dotenv.config();

@Injectable()
export class PersonCountingService {
  constructor(
    @InjectModel('Person Counting') private personCounting: Model<PeopleCountingType>,
    @InjectModel('Store') private store: Model<Store>,
    @InjectModel('Product Stats') private stats: Model<StatsType>,
    private readonly appGateway: AppGateway
  ) {}

  async addEntry(
    data: PeopleCountingType
  ): Promise<{ success: true } | { success: false; error: number }> {
    try {
      const { store, cameraId, ...rest } = data;
      const storeData = await this.store.find({ _id: new Types.ObjectId(store as string) });
      if (storeData) {
        const entryData = new this.personCounting({ ...data });
        const result = await entryData.save();

        if (result) {
          const incFields: Record<string, number> = {};
          const setFields: Record<string, any> = {};

          for (const [key, value] of Object.entries(rest)) {
            if (key === 'liveOccupancy') {
              // always overwrite liveOccupancy
              setFields[`data.${key}`] = value ?? 0;
              continue;
            }
            if (typeof value === 'number') {
              incFields[`data.${key}`] = value ?? 0;
            } else {
              setFields[`data.${key}`] = value;
            }
          }

          const aggregatedResult = await this.stats.updateOne(
            { store, cameraId },
            {
              $inc: incFields,
              $set: {
                ...setFields,
                store,
                'data.store': store,
                'data.cameraId': cameraId,
              },
            },
            { upsert: true }
          );
          if (!aggregatedResult) {
            return { success: false, error: 400 };
          } else {
            const aggregatedAllResult = await this.stats.updateOne(
              { store, cameraId: 'all' },
              {
                $inc: incFields,
                $set: {
                  ...setFields,
                  store,

                  'data.store': store,
                  'data.cameraId': cameraId,
                },
              },
              { upsert: true }
            );
            if (!aggregatedAllResult) {
              return { success: false, error: 404 };
            } else {
              const statsData = await this.stats.findOne({
                store: new Types.ObjectId(store as string),
                cameraId: 'all',
              });
              if (statsData) {
                this.appGateway.handlePepleStats(statsData.data, 'abc');
                return { success: true };
              } else {
                return { success: false, error: 404 };
              }
            }
          }
        } else {
          return { success: false, error: 401 };
        }
      } else {
        return { success: false, error: 404 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async getStats(
    store: string
  ): Promise<{ success: true; data: PeopleCountingType } | { success: false; error: number }> {
    try {
      const data = await this.stats.findOne({ store: new Types.ObjectId(store), cameraId: 'all' });
      if (data) {
        return { success: true, data: data.data };
      } else {
        return { success: false, error: 404 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }
}
