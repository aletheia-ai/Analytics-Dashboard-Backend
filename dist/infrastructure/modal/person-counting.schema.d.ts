import { PeopleCountingType } from '@src/utils/types/people-counting-type';
import { Schema, Types } from 'mongoose';
export declare const PersonCountingSchema: Schema<PeopleCountingType, import("mongoose").Model<PeopleCountingType, any, any, any, import("mongoose").Document<unknown, any, PeopleCountingType, any, {}> & PeopleCountingType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PeopleCountingType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PeopleCountingType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PeopleCountingType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
