import { AuthService } from '../service/auth.service';
import { SignInDto, SignUpDto } from '../dto/auth';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto, res: Response): Promise<void>;
    signUp(signupDto: SignUpDto): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
    logout(res: Response): void;
}
