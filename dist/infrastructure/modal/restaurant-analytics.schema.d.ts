import { Schema, Types } from 'mongoose';
import { RestaurantAnalyticsType } from '@src/utils/types';
export declare const RestaurantAnalyticsSchema: Schema<RestaurantAnalyticsType, import("mongoose").Model<RestaurantAnalyticsType, any, any, any, import("mongoose").Document<unknown, any, RestaurantAnalyticsType, any, {}> & RestaurantAnalyticsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RestaurantAnalyticsType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<RestaurantAnalyticsType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<RestaurantAnalyticsType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const RestauranAnalyticsModal: import("mongoose").Model<RestaurantAnalyticsType, {}, {}, {}, import("mongoose").Document<unknown, {}, RestaurantAnalyticsType, {}, {}> & RestaurantAnalyticsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
