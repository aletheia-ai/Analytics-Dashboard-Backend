import { Schema } from 'mongoose';
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    age?: number | null | undefined;
    address?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    age?: number | null | undefined;
    address?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
}>, {}> & import("mongoose").FlatRecord<{
    firstName?: string | null | undefined;
    lastName?: string | null | undefined;
    age?: number | null | undefined;
    address?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | null | undefined;
    phone?: string | null | undefined;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
