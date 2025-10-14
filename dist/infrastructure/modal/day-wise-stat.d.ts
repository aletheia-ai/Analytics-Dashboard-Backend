import mongoose, { Types } from 'mongoose';
import { DayWiseStatsType } from '@src/utils/types/day-wise-stat-type';
export declare const DayWiseStatsSchema: mongoose.Schema<DayWiseStatsType, mongoose.Model<DayWiseStatsType, any, any, any, mongoose.Document<unknown, any, DayWiseStatsType, any, {}> & DayWiseStatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, DayWiseStatsType, mongoose.Document<unknown, {}, mongoose.FlatRecord<DayWiseStatsType>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<DayWiseStatsType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const DayWiseStatsModel: mongoose.Model<DayWiseStatsType, {}, {}, {}, mongoose.Document<unknown, {}, DayWiseStatsType, {}, mongoose.DefaultSchemaOptions> & DayWiseStatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<DayWiseStatsType, mongoose.Model<DayWiseStatsType, any, any, any, mongoose.Document<unknown, any, DayWiseStatsType, any, {}> & DayWiseStatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, DayWiseStatsType, mongoose.Document<unknown, {}, mongoose.FlatRecord<DayWiseStatsType>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<DayWiseStatsType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
