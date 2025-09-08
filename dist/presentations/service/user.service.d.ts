import { Model, Types } from 'mongoose';
import { type User } from '@utils/types';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    private readonly users;
    getAllUsers(): User[];
    authorizeUser(userId: string): Promise<{
        success: true;
        payload: {
            sub: string;
            email: string;
            isAuthorized: boolean;
            hasRegisteredBusiness: boolean;
            isVerified: boolean;
        };
    } | {
        success: false;
        error: number;
    }>;
    verifyUser(userId: string): Promise<{
        success: true;
        payload: {
            sub: string;
            email: string;
            isAuthorized: boolean;
            hasRegisteredBusiness: boolean;
            isVerified: boolean;
        };
    } | {
        success: false;
        error: number;
    }>;
    findOne(username: string): Promise<User | undefined>;
    addUser(user: User): Promise<{
        success: true;
        data: Types.ObjectId;
    } | {
        success: false;
    }>;
}
