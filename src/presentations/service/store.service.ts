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

  async addNewStore(
    storeData: Store,
    id: string
  ): Promise<{ success: true } | { success: false; error: Number }> {
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
              return { success: true };
            } else {
              return { success: false, error: 409 };
            }
          } else {
            return { success: false, error: 404 };
          }
        }
        return { success: false, error: 403 };
      } else {
        return { success: false, error: 404 };
      }
    } catch (error) {
      return { success: false, error: error.code || 500 };
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
        const storeData = await this.store.find({ company: companyId });
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
