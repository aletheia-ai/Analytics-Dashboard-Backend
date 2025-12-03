import { Document } from 'mongoose';
export interface Email extends Document {
    to: string;
    subject: string;
    template: string;
    context: any;
    attachments: string[];
    sentStatus: boolean;
    sentAt?: Date;
}
export interface UserEmail extends Document {
    to: string;
    subject: string;
    template: string;
    sentAt: Date;
}
export declare const EmailSchema: {
    to: {
        type: StringConstructor;
        required: boolean;
    };
    subject: {
        type: StringConstructor;
        required: boolean;
    };
    template: {
        type: StringConstructor;
        required: boolean;
    };
    context: {
        type: ObjectConstructor;
        default: {};
    };
    attachments: {
        type: StringConstructor[];
        default: never[];
    };
    sentStatus: {
        type: BooleanConstructor;
        required: boolean;
    };
    sentAt: {
        type: DateConstructor;
        default: () => number;
    };
};
export declare const UserEmailSchema: {
    to: {
        type: StringConstructor;
        required: boolean;
    };
    subject: {
        type: StringConstructor;
        required: boolean;
    };
    template: {
        type: StringConstructor;
        required: boolean;
    };
    sentAt: {
        type: DateConstructor;
        default: () => number;
    };
};
