import { Schema, Types } from 'mongoose';
export declare const PersonCountingSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    store: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    enterCount: number;
    exitCount: number;
    maskCount: number;
    unMaskCount: number;
    maleCount: number;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    store: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    enterCount: number;
    exitCount: number;
    maskCount: number;
    unMaskCount: number;
    maleCount: number;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    store: {
        prototype?: Types.ObjectId | null | undefined;
        cacheHexString?: unknown;
        generate?: {} | null | undefined;
        createFromTime?: {} | null | undefined;
        createFromHexString?: {} | null | undefined;
        createFromBase64?: {} | null | undefined;
        isValid?: {} | null | undefined;
    };
    enterCount: number;
    exitCount: number;
    maskCount: number;
    unMaskCount: number;
    maleCount: number;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
