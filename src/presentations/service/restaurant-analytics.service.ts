import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RestaurantAnalyticsType } from '@src/utils/types';
import { Store } from '@src/utils/types/store-type';
import { Model, Types } from 'mongoose';

@Injectable()
export class RestaurantAnalyticsService {
  constructor(
    @InjectModel('Restaurant-Analytics')
    private restaurantAnalytics: Model<RestaurantAnalyticsType>,
    @InjectModel('Store') private store: Model<Store>
  ) {}

  async addAnalyticsEntry({
    store,
  }: RestaurantAnalyticsType): Promise<
    { success: true } | { success: false; error: number; errorType: 'store' | 'other' }
  > {
    try {
      const isStoreAvailable = await this.store.findOne({ _id: store });
      if (isStoreAvailable) {
        const analytics = new this.restaurantAnalytics({ store });
        await analytics.save();

        return { success: true };
      } else {
        return { success: false, error: 404, errorType: 'store' };
      }
    } catch (err) {
      return { success: false, error: err.code || 500, errorType: 'other' };
    }
  }
}
