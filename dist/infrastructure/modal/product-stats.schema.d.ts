import mongoose, { Types } from 'mongoose';
import { StatsType } from '@src/utils/types/stats-type';
export declare const ProductStatsSchema: mongoose.Schema<StatsType, mongoose.Model<StatsType, any, any, any, mongoose.Document<unknown, any, StatsType, any, {}> & StatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, StatsType, mongoose.Document<unknown, {}, mongoose.FlatRecord<StatsType>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<StatsType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ProductStatsModel: mongoose.Model<StatsType, {}, {}, {}, mongoose.Document<unknown, {}, StatsType, {}, mongoose.DefaultSchemaOptions> & StatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<StatsType, mongoose.Model<StatsType, any, any, any, mongoose.Document<unknown, any, StatsType, any, {}> & StatsType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, StatsType, mongoose.Document<unknown, {}, mongoose.FlatRecord<StatsType>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<StatsType> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
