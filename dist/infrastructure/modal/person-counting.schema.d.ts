import { Schema } from 'mongoose';
export declare const PersonCountingSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    age?: number | null | undefined;
    footFall?: number | null | undefined;
    Exit?: number | null | undefined;
    gender?: string | null | undefined;
    occupancy?: number | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    age?: number | null | undefined;
    footFall?: number | null | undefined;
    Exit?: number | null | undefined;
    gender?: string | null | undefined;
    occupancy?: number | null | undefined;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    age?: number | null | undefined;
    footFall?: number | null | undefined;
    Exit?: number | null | undefined;
    gender?: string | null | undefined;
    occupancy?: number | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
