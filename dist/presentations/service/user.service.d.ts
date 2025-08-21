import { Model } from 'mongoose';
import { type User } from '@utils/types';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    private readonly users;
    getAllUsers(): User[];
    findOne(username: string): Promise<User | undefined>;
    addUser(user: User): Promise<{
        success: boolean;
    }>;
}
