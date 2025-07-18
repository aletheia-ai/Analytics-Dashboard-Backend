import { CreateUserDto, GetUserDto } from '@presentations/dto/user';
import { UserService } from '@presentations/service/user.service';
import { User } from '@src/utils/types';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    Create(createUserDto: CreateUserDto): Promise<any[]>;
    getUser({ email }: GetUserDto): Promise<User>;
}
