import { type User } from '@utils/types';
export declare class UserService {
    private readonly users;
    getAllUsers(): User[];
    findOne(email: string): Promise<User | undefined>;
    addUser(user: User): Promise<{
        success: boolean;
    }>;
}
