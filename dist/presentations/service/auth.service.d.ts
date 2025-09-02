import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInExceptions, User } from '@utils/types';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    authorizeUser(userId: string): Promise<{
        success: true;
        access_token: string;
    } | {
        success: false;
        error: number;
    }>;
    signUp(user: User): Promise<{
        success: true;
        access_token: string;
    } | {
        success: false;
    }>;
    signIn(username: string, pass: string): Promise<{
        success: true;
        access_token: string;
    } | {
        success: false;
        error: SignInExceptions;
    }>;
}
