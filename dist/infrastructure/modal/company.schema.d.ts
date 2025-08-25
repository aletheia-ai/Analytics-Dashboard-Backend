import { Schema } from 'mongoose';
export declare const CompanySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    ownerId: number;
    name: string;
    companyId: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    ownerId: number;
    name: string;
    companyId: number;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    ownerId: number;
    name: string;
    companyId: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Company: import("mongoose").Model<{
    ownerId: number;
    name: string;
    companyId: number;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    ownerId: number;
    name: string;
    companyId: number;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    ownerId: number;
    name: string;
    companyId: number;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    ownerId: number;
    name: string;
    companyId: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    ownerId: number;
    name: string;
    companyId: number;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    ownerId: number;
    name: string;
    companyId: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
