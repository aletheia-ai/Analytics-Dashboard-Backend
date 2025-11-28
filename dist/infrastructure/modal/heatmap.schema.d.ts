import { HeatmapItemType } from '@src/utils/types/heatmap-item-type';
import { Schema, Types } from 'mongoose';
export declare const HeatmapItemSchema: Schema<HeatmapItemType, import("mongoose").Model<HeatmapItemType, any, any, any, import("mongoose").Document<unknown, any, HeatmapItemType, any, {}> & HeatmapItemType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HeatmapItemType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<HeatmapItemType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<HeatmapItemType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
