import { AuthService } from '../service/auth.service';
import { SignInDto } from '../dto/auth';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto, res: Response): Promise<void>;
    getProfile(req: any): any;
    logout(res: Response): void;
}
