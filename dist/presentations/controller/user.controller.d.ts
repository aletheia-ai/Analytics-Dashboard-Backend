import { EditUserByIdDto, GetUserByIdDto } from '@presentations/dto/user';
import { UserService } from '@presentations/service/user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateUser(editUserDto: EditUserByIdDto): Promise<{
        message: string;
        data: import("../../utils/types").User;
    }>;
    getUserById(getuserById: GetUserByIdDto): Promise<{
        message: {
            firstName: string;
            lastName: string;
            email: string;
            userType: import("../../utils/types").UserRoleType;
        };
    }>;
}
