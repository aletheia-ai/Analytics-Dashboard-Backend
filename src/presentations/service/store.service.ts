import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import type { Store } from '@utils/types/store-type';
import type { Company } from '@src/utils/types/company-type';
import type { Region } from '@src/utils/types/region-type';
import { DayWiseStatsType } from '@src/utils/types/day-wise-stat-type';
import { daysOfWeek } from '@src/utils/constants/days-of-week';
import { HourWiseStatsType } from '@src/utils/types/hour-stat.type';
const defaultData = {
  enterCount: 0,
  exitCount: 0,
  maskCount: 0,
  unMaskCount: 0,
  maleCount: 0,
  feMaleCount: 0,
  passingBy: 0,
  age_0_9_Count: 0,
  age_10_18_Count: 0,
  age_19_34_Count: 0,
  age_35_60_Count: 0,
  age_60plus_Count: 0,
  interestedCustomers: 0,
  buyingCustomers: 0,
  liveOccupancy: 0,
};

@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store') private store: Model<Store>,
    @InjectModel('Company') private company: Model<Company>,
    @InjectModel('Region') private region: Model<Region>,
    @InjectModel('Day Wise Stats') private dayWiseStats: Model<DayWiseStatsType>,
    @InjectModel('Hour Wise Stats') private hourWiseStats: Model<HourWiseStatsType>
  ) {}

  async deleteStore(
    companyId: string,
    userId: string,
    storeId: string
  ): Promise<
    | { success: true; stores: Store[] }
    | {
        success: false;
        error: Number;
        errorType: 'conflict' | 'forbidden' | 'company' | 'other' | 'region' | 'store';
      }
  > {
    try {
      const companyData = await this.company.findById(companyId);
      if (companyData) {
        if (companyData.user.toString() === userId.toString()) {
          const storeData = await this.store.findById(storeId);
          if (storeData) {
            const result = await this.store.deleteOne({ _id: new Types.ObjectId(storeId) });
            if (result.acknowledged) {
              const remainingStores = await this.store.find({
                company: new Types.ObjectId(companyId),
              });

              return { success: true, stores: remainingStores };
            } else {
              return { success: false, error: 400, errorType: 'other' };
            }
          } else {
            return { success: false, error: 404, errorType: 'store' };
          }
        } else {
          return { success: false, error: 403, errorType: 'forbidden' };
        }
      } else {
        return { success: false, error: 404, errorType: 'company' };
      }
    } catch (err) {
      return { success: false, error: err.code || 500, errorType: 'other' };
    }
  }
  async editExistingStore(
    storeData: Store,
    id: string,
    storeId: string
  ): Promise<
    | { success: true; stores: Store[] }
    | {
        success: false;
        error: Number;
        errorType: 'conflict' | 'forbidden' | 'company' | 'other' | 'region' | 'store';
      }
  > {
    try {
      const { company, region } = storeData;
      const userId = id;
      const companyData = await this.company.findById(company).exec();
      if (companyData) {
        if (companyData.user.toString() === userId.toString()) {
          const regionData = await this.region.findById(region).exec();
          if (regionData) {
            const existingStore = await this.store.findOne({ _id: new Types.ObjectId(storeId) });
            if (!existingStore) {
              return { success: false, error: 404, errorType: 'store' };
            } else {
              const store = await this.store.findByIdAndUpdate(
                storeId,
                { $set: storeData },
                { new: true }
              );
              if (store) {
                const stores = await this.store.find({
                  company: new Types.ObjectId(companyData._id),
                });
                return { success: true, stores };
              } else {
                return { success: false, error: 500, errorType: 'other' };
              }
            }
          } else {
            return { success: false, error: 404, errorType: 'region' };
          }
        } else {
          return { success: false, error: 403, errorType: 'forbidden' };
        }
      } else {
        return { success: false, error: 404, errorType: 'company' };
      }
    } catch (err) {
      return { success: false, error: err.code || 500, errorType: 'other' };
    }
  }

  async addNewStore(
    storeData: Store,
    id: string
  ): Promise<
    | { success: true; stores: Store[]; store: Store }
    | {
        success: false;
        error: Number;
        errorType: 'conflict' | 'forbidden' | 'company' | 'other' | 'region' | 'store';
      }
  > {
    try {
      const { company, region } = storeData;
      const userId = id;
      const companyData = await this.company.findById(company).exec();
      if (companyData) {
        if (companyData.user.toString() === userId.toString()) {
          const regionData = await this.region.findById(region).exec();
          if (regionData) {
            const existingStore = await this.store.findOne({ name: storeData.name });
            if (!existingStore) {
              const store = new this.store({ ...storeData });
              await store.save();
              const stores = await this.store.find({
                company: new Types.ObjectId(companyData._id),
              });
              if (store) {
                const dayWiseStatsDocs = daysOfWeek.map((day) => ({
                  store: store._id,
                  day: day.name,
                  data: { ...defaultData, store: store._id, cameraId: 'xyz' },
                }));
                await this.dayWiseStats.insertMany(dayWiseStatsDocs);
              }
              const hours = Array.from({ length: 24 }, (_, i) => i);
              await this.hourWiseStats.insertMany(
                hours.map((hour) => ({
                  store: store._id,
                  hour,
                  data: {
                    ...defaultData,
                    store: store._id,
                    cameraId: 'xyz',
                  },
                }))
              );
              return { success: true, stores, store };
            } else {
              return { success: false, error: 404, errorType: 'store' };
            }
          } else {
            return { success: false, error: 404, errorType: 'region' };
          }
        }
        return { success: false, error: 403, errorType: 'forbidden' };
      } else {
        return { success: false, error: 404, errorType: 'company' };
      }
    } catch (error) {
      console.log(error);
      return { success: false, error: error.code || 500, errorType: 'other' };
    }
  }

  async getAllStores(
    companyId: string
  ): Promise<
    | { success: false; error: number; errorFrom: 'Company' | 'Store' }
    | { success: true; data: Store[] }
  > {
    try {
      const companyData = await this.company.findById(companyId);
      if (!companyData) {
        return { success: false, error: 404, errorFrom: 'Company' };
      } else {
        const storeData = await this.store.find({ company: new Types.ObjectId(companyId) });
        if (!storeData) {
          return { success: false, error: 404, errorFrom: 'Store' };
        } else {
          return { success: true, data: storeData };
        }
      }
    } catch (error) {
      return { success: false, error: error.code || 500, errorFrom: 'Store' };
    }
  }
}
