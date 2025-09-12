import { GetUserByIdDto } from './get-user-dto';
import { EditUserByIdDto } from './edit-user.dto';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    email: string;
    password: string;
    phone: string;
}
export declare class GetUserDto {
    email: string;
}
export { GetUserByIdDto, EditUserByIdDto };
