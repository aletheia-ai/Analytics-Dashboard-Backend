import { AuthService } from '../service/auth.service';
import { AuthorizeUserDto, SignInDto, SignUpDto } from '../dto/auth';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    authorizeUser(authorizeUserDto: AuthorizeUserDto, res: Response): Promise<void>;
    verifyUser(authorizeUserDto: AuthorizeUserDto, res: Response): Promise<void>;
    signIn(signInDto: SignInDto, res: Response): Promise<void>;
    signUp(signupDto: SignUpDto, res: Response): Promise<void>;
    getProfile(req: any): any;
    logout(res: Response): void;
}
