import { User } from '@utils/types';
export declare class UserService {
    private readonly users;
    create(user: User): void;
    findAll(): User[];
}
