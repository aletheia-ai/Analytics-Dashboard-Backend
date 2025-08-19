import { Schema } from 'mongoose';
export declare const PersonCountingSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    footFall?: number | null | undefined;
    Exit?: number | null | undefined;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    occupancy?: number | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    footFall?: number | null | undefined;
    Exit?: number | null | undefined;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    occupancy?: number | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    footFall?: number | null | undefined;
    Exit?: number | null | undefined;
    age?: number | null | undefined;
    gender?: string | null | undefined;
    occupancy?: number | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
