import { Schema } from 'mongoose';
import { Region } from '@src/utils/types/region-type';
export declare const RegionSchema: Schema<Region, import("mongoose").Model<Region, any, any, any, import("mongoose").Document<unknown, any, Region, any, {}> & Region & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Region, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Region>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Region> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
