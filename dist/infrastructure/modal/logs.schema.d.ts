import { Schema, Types } from 'mongoose';
export declare const logSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    label: string;
    status: string;
    logs?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    label: string;
    status: string;
    logs?: string | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    label: string;
    status: string;
    logs?: string | null | undefined;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
