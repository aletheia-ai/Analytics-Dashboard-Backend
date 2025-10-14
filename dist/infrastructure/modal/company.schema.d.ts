import { Schema } from 'mongoose';
import type { Company } from '@src/utils/types/company-type';
export declare const CompanySchema: Schema<Company, import("mongoose").Model<Company, any, any, any, import("mongoose").Document<unknown, any, Company, any, {}> & Company & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Company, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Company>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Company> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
export declare const CompanyModal: import("mongoose").Model<Company, {}, {}, {}, import("mongoose").Document<unknown, {}, Company, {}, {}> & Company & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
