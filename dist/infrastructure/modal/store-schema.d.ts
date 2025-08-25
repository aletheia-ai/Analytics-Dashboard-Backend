import { Schema } from 'mongoose';
export declare const StoreSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Store: import("mongoose").Model<{
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    regionId: number;
    name: string;
    storeId: number;
    companyId: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
