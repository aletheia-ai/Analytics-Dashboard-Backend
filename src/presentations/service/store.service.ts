import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Store } from '@utils/types/store-type';

@Injectable()
export class StoreService {
  constructor(@InjectModel('Store') private store: Model<Store>) {}

  async addNewStore(
    storeData: Store
  ): Promise<{ success: true } | { success: false; error: Number }> {
    try {
      const company = await this.store.db
        .collection('companies')
        .findOne({ companyId: storeData.companyId });
      if (!company) {
        return { success: false, error: 404 };
      }
      const store = new this.store(storeData);
      await store.save();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.code };
    }
  }
}
