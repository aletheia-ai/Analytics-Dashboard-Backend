import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { InjectModel } from '@nestjs/mongoose';
import { PeopleCountingType } from '@src/utils/types/people-counting-type';
import { Model, Types } from 'mongoose';
import { Store } from '@src/utils/types/store-type';
import { StatsType } from '@src/utils/types/stats-type';
import { AppGateway } from '@src/utils/shared/socket';
// import { QueueService } from '@src/utils/queue/queue.service';
import { RangeType } from '@src/utils/types/range-type';
import { DayWiseStatsType } from '@src/utils/types/day-wise-stat-type';
import { HourWiseStatsType } from '@src/utils/types/hour-stat.type';
import { sumObjects } from '@src/utils/methods/aggregated-stats';

dotenv.config();

@Injectable()
export class PersonCountingService {
  constructor(
    @InjectModel('Person Counting') private personCounting: Model<PeopleCountingType>,
    @InjectModel('Store') private store: Model<Store>,
    @InjectModel('Product Stats') private stats: Model<StatsType>,
    @InjectModel('Day Wise Stats') private dayWiseStats: Model<DayWiseStatsType>,
    @InjectModel('Hour Wise Stats') private hourWiseStats: Model<HourWiseStatsType>,
    private readonly appGateway: AppGateway
    // private readonly queue: QueueService
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
            { store, cameraId, range: RangeType.ALL_TIME },
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
              { store, cameraId: 'all', range: RangeType.ALL_TIME },
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
                this.appGateway.handlePepleStats(result, 'abc');

                const dayName = (entryData as any).createdAt.toLocaleDateString('en-US', {
                  weekday: 'long',
                });

                const now = new Date();
                const currentHour = (now.getUTCHours() + 5) % 24;

                await this.dayWiseStats.updateOne(
                  { store, day: dayName },
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

                await this.hourWiseStats.updateOne(
                  { store, hour: currentHour },
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
      console.log('err', err.message);
      return { success: false, error: err.code || 500 };
    }
  }

  async getStats(
    store: string[],
    range: RangeType
  ): Promise<{ success: true; data: PeopleCountingType } | { success: false; error: number }> {
    try {
      const objectIds = store.map((id) => new Types.ObjectId(id));
      const data = await this.stats
        .find({
          store: { $in: objectIds },
          cameraId: 'all',
          range: range,
        })
        .lean();
      if (data) {
        const result = data.map((item) => item.data);

        const finalResult = sumObjects(result);

        return { success: true, data: finalResult };
      } else {
        return { success: false, error: 404 };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async getDayWiseStats(
    store: string[]
  ): Promise<{ success: true; data: DayWiseStatsType[] } | { success: false; error: number }> {
    try {
      const objectIds = store.map((id) => new Types.ObjectId(id));

      const stats = await this.dayWiseStats.aggregate([
        {
          $match: { store: { $in: objectIds } },
        },
        {
          $group: {
            _id: '$day',
            store: { $first: '$store' },
            cameraId: { $first: '$data.cameraId' },
            enterCount: { $sum: '$data.enterCount' },
            exitCount: { $sum: '$data.exitCount' },
            maskCount: { $sum: '$data.maskCount' },
            unMaskCount: { $sum: '$data.unMaskCount' },
            maleCount: { $sum: '$data.maleCount' },
            feMaleCount: { $sum: '$data.feMaleCount' },
            passingBy: { $sum: '$data.passingBy' },
            age_0_9_Count: { $sum: '$data.age_0_9_Count' },
            age_10_18_Count: { $sum: '$data.age_10_18_Count' },
            age_19_34_Count: { $sum: '$data.age_19_34_Count' },
            age_35_60_Count: { $sum: '$data.age_35_60_Count' },
            age_60plus_Count: { $sum: '$data.age_60plus_Count' },
            interestedCustomers: { $sum: '$data.interestedCustomers' },
            buyingCustomers: { $sum: '$data.buyingCustomers' },
            liveOccupancy: { $sum: '$data.liveOccupancy' },
          },
        },
        {
          $addFields: {
            dayOrder: {
              $switch: {
                branches: [
                  { case: { $eq: ['$_id', 'Monday'] }, then: 1 },
                  { case: { $eq: ['$_id', 'Tuesday'] }, then: 2 },
                  { case: { $eq: ['$_id', 'Wednesday'] }, then: 3 },
                  { case: { $eq: ['$_id', 'Thursday'] }, then: 4 },
                  { case: { $eq: ['$_id', 'Friday'] }, then: 5 },
                  { case: { $eq: ['$_id', 'Saturday'] }, then: 6 },
                  { case: { $eq: ['$_id', 'Sunday'] }, then: 7 },
                ],
                default: 8,
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            day: '$_id',
            data: {
              store: '$store',
              cameraId: '$cameraId',
              enterCount: '$enterCount',
              exitCount: '$exitCount',
              maskCount: '$maskCount',
              unMaskCount: '$unMaskCount',
              maleCount: '$maleCount',
              feMaleCount: '$feMaleCount',
              passingBy: '$passingBy',
              age_0_9_Count: '$age_0_9_Count',
              age_10_18_Count: '$age_10_18_Count',
              age_19_34_Count: '$age_19_34_Count',
              age_35_60_Count: '$age_35_60_Count',
              age_60plus_Count: '$age_60plus_Count',
              interestedCustomers: '$interestedCustomers',
              buyingCustomers: '$buyingCustomers',
              liveOccupancy: '$liveOccupancy',
            },
            dayOrder: 1,
          },
        },
        { $sort: { dayOrder: 1 } },
      ]);

      return { success: true, data: stats };
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async getHourWiseStats(
    store: string[]
  ): Promise<{ success: true; data: HourWiseStatsType[] } | { success: false; error: number }> {
    try {
      const objectIds = store.map((id) => new Types.ObjectId(id));

      const stats = await this.hourWiseStats.aggregate([
        {
          $match: { store: { $in: objectIds } },
        },
        {
          $group: {
            _id: '$hour',
            store: { $first: '$store' },
            cameraId: { $first: '$data.cameraId' },
            enterCount: { $sum: '$data.enterCount' },
            exitCount: { $sum: '$data.exitCount' },
            maskCount: { $sum: '$data.maskCount' },
            unMaskCount: { $sum: '$data.unMaskCount' },
            maleCount: { $sum: '$data.maleCount' },
            feMaleCount: { $sum: '$data.feMaleCount' },
            passingBy: { $sum: '$data.passingBy' },
            age_0_9_Count: { $sum: '$data.age_0_9_Count' },
            age_10_18_Count: { $sum: '$data.age_10_18_Count' },
            age_19_34_Count: { $sum: '$data.age_19_34_Count' },
            age_35_60_Count: { $sum: '$data.age_35_60_Count' },
            age_60plus_Count: { $sum: '$data.age_60plus_Count' },
            interestedCustomers: { $sum: '$data.interestedCustomers' },
            buyingCustomers: { $sum: '$data.buyingCustomers' },
            liveOccupancy: { $sum: '$data.liveOccupancy' },
          },
        },
        {
          $project: {
            _id: 0,
            hour: '$_id',
            data: {
              store: '$store',
              cameraId: '$cameraId',
              enterCount: '$enterCount',
              exitCount: '$exitCount',
              maskCount: '$maskCount',
              unMaskCount: '$unMaskCount',
              maleCount: '$maleCount',
              feMaleCount: '$feMaleCount',
              passingBy: '$passingBy',
              age_0_9_Count: '$age_0_9_Count',
              age_10_18_Count: '$age_10_18_Count',
              age_19_34_Count: '$age_19_34_Count',
              age_35_60_Count: '$age_35_60_Count',
              age_60plus_Count: '$age_60plus_Count',
              interestedCustomers: '$interestedCustomers',
              buyingCustomers: '$buyingCustomers',
              liveOccupancy: '$liveOccupancy',
            },
          },
        },
        { $sort: { hour: 1 } }, // ensure sorted order 0 → 23
      ]);

      return { success: true, data: stats };
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }

  async getCurrentHourStats(store: string[]): Promise<
    | {
        success: true;
        data: {
          age_0_9_Count: number;
          age_10_18_Count: number;
          age_19_34_Count: number;
          age_35_60_Count: number;
          age_60plus_Count: number;
          enterCount: number;
        };
      }
    | { success: false; error: number }
  > {
    try {
      const now = new Date();
      const currentHour = now.getUTCHours() + 5;
      const objectIds = store.map((id) => new Types.ObjectId(id));
      const stats = await this.hourWiseStats
        .find({ store: { $in: objectIds }, hour: currentHour })
        .lean();
      if (stats && stats.length > 0) {
        const result = stats.map((item) => item.data);
        const {
          age_0_9_Count,
          age_10_18_Count,
          age_19_34_Count,
          age_35_60_Count,
          age_60plus_Count,
          enterCount,
        } = sumObjects(result);
        return {
          success: true,
          data: {
            age_0_9_Count,
            age_10_18_Count,
            age_19_34_Count,
            age_35_60_Count,
            age_60plus_Count,
            enterCount,
          },
        };
      } else {
        return {
          success: true,
          data: {
            age_0_9_Count: 0,
            age_10_18_Count: 0,
            age_19_34_Count: 0,
            age_35_60_Count: 0,
            age_60plus_Count: 0,
            enterCount: 0,
          },
        };
      }
    } catch (err) {
      return { success: false, error: err.code || 500 };
    }
  }
}
