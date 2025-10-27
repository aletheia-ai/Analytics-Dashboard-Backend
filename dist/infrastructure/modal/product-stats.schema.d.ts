import mongoose, { Types } from 'mongoose';
import { StatsType } from '@src/utils/types/stats-type';
export declare const ProductStatsSchema: mongoose.Schema<StatsType & {
    source: string;
}, mongoose.Model<StatsType & {
    source: string;
}, any, any, any, mongoose.Document<unknown, any, StatsType & {
    source: string;
}, any, {}> & StatsType & {
    source: string;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, StatsType & {
    source: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<StatsType & {
    source: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<StatsType & {
    source: string;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const ProductStatsModel: mongoose.Model<StatsType & {
    source: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, StatsType & {
    source: string;
}, {}, mongoose.DefaultSchemaOptions> & StatsType & {
    source: string;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<StatsType & {
    source: string;
}, mongoose.Model<StatsType & {
    source: string;
}, any, any, any, mongoose.Document<unknown, any, StatsType & {
    source: string;
}, any, {}> & StatsType & {
    source: string;
} & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, StatsType & {
    source: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<StatsType & {
    source: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<StatsType & {
    source: string;
}> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>>;
