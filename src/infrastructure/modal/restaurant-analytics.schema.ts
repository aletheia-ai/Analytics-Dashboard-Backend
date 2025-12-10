import { Schema, model, Types } from 'mongoose';

import { RestaurantAnalyticsType } from '@src/utils/types';

export const RestaurantAnalyticsSchema = new Schema<RestaurantAnalyticsType>({
  store: { type: Types.ObjectId, ref: 'Store', required: true },
});

export const RestauranAnalyticsModal = model<RestaurantAnalyticsType>(
  'Restaurant-Analytics',
  RestaurantAnalyticsSchema,
  'restaurant-analytics'
);
