import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInExceptions } from '@src/utils/types';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    signIn(username: string, pass: string): Promise<{
        success: true;
        access_token: string;
    } | {
        success: false;
        error: SignInExceptions;
    }>;
}
