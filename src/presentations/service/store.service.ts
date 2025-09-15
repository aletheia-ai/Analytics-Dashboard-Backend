import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import type { Store } from '@utils/types/store-type';
import type { Company } from '@src/utils/types/company-type';
import type { Region } from '@src/utils/types/region-type';
@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store') private store: Model<Store>,
    @InjectModel('Company') private company: Model<Company>,
    @InjectModel('Region') private region: Model<Region>
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
