import { User } from '@utils/types';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(user: User): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | undefined>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    getUser(email: string): Promise<{
        success: true;
        data: User;
    } | {
        success: false;
    }>;
    getAllUsers(email: string): Promise<{
        success: true;
        data: User;
    } | {
        success: false;
    }>;
    deleteUser(email: string): Promise<{
        success: boolean;
    }>;
}
