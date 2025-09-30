import mongoose, { Types } from 'mongoose';
import { HourWiseStatsType } from '@src/utils/types/hour-stat.type';
export declare const HourWiseStatsSchema: mongoose.Schema<HourWiseStatsType, mongoose.Model<HourWiseStatsType, any, any, any, mongoose.Document<unknown, any, HourWiseStatsType, any, {}> & HourWiseStatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, HourWiseStatsType, mongoose.Document<unknown, {}, mongoose.FlatRecord<HourWiseStatsType>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<HourWiseStatsType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const HourWiseStatsModel: mongoose.Model<HourWiseStatsType, {}, {}, {}, mongoose.Document<unknown, {}, HourWiseStatsType, {}, mongoose.DefaultSchemaOptions> & HourWiseStatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<HourWiseStatsType, mongoose.Model<HourWiseStatsType, any, any, any, mongoose.Document<unknown, any, HourWiseStatsType, any, {}> & HourWiseStatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, HourWiseStatsType, mongoose.Document<unknown, {}, mongoose.FlatRecord<HourWiseStatsType>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<HourWiseStatsType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
