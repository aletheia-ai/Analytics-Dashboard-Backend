import { RestaurantAnalyticsType } from '@src/utils/types';
import { Store } from '@src/utils/types/store-type';
import { Model } from 'mongoose';
export declare class RestaurantAnalyticsService {
    private restaurantAnalytics;
    private store;
    constructor(restaurantAnalytics: Model<RestaurantAnalyticsType>, store: Model<Store>);
    addAnalyticsEntry({ store, }: RestaurantAnalyticsType): Promise<{
        success: true;
    } | {
        success: false;
        error: number;
        errorType: 'store' | 'other';
    }>;
}
