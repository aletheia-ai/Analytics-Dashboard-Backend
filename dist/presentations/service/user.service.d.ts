import type { User } from '@utils/types';
export declare class UserService {
    private readonly users;
    findOne(email: string): Promise<User | undefined>;
}
