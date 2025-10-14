import { Schema, Types } from 'mongoose';
export declare const logSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    label: string;
    status: string;
    logs?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    label: string;
    status: string;
    logs?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    label: string;
    status: string;
    logs?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
