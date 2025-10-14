import { Schema, Types } from 'mongoose';
import type { Store } from '@src/utils/types/store-type';
export declare const StoreSchema: Schema<Store, import("mongoose").Model<Store, any, any, any, import("mongoose").Document<unknown, any, Store, any, {}> & Store & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Store, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Store>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Store> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const StoreModal: import("mongoose").Model<Store, {}, {}, {}, import("mongoose").Document<unknown, {}, Store, {}, import("mongoose").DefaultSchemaOptions> & Store & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, Schema<Store, import("mongoose").Model<Store, any, any, any, import("mongoose").Document<unknown, any, Store, any, {}> & Store & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Store, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Store>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Store> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
