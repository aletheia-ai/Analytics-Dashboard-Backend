import { CreateUserDto } from '@presentations/dto/user';
import { UserService } from '@presentations/service/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    Create(createUserDto: CreateUserDto): Promise<any[]>;
}
