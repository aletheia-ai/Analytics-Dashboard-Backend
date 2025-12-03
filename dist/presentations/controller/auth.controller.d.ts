import { AuthService } from '../service/auth.service';
import { EmailService } from '@src/email/email.service';
import { UserService } from '../service/user.service';
import { AuthorizeUserDto, ChangePasswordDto, DeleteAccountDto, SignInDto, SignUpDto, VerifyEmail } from '../dto/auth';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    private readonly userService;
    private readonly emailService;
    constructor(authService: AuthService, userService: UserService, emailService: EmailService);
    authorizeUser(authorizeUserDto: AuthorizeUserDto, res: Response): Promise<void>;
    verifyUser(authorizeUserDto: AuthorizeUserDto, res: Response): Promise<void>;
    signIn(signInDto: SignInDto, res: Response): Promise<void>;
    signUp(signupDto: SignUpDto, res: Response): Promise<void>;
    getProfile(req: any): Promise<{
        message: any;
        company: import("../../utils/types/company-type").Company | null;
        stores: import("../../utils/types/store-type").Store[] | null;
        regions: import("../../utils/types/region-type").Region[] | null;
        user: import("@src/utils/types").User;
        fixedStore: string | null;
    }>;
    deleteCompanyData(deleteAccountDto: DeleteAccountDto, res: Response): Promise<void>;
    changeUserPassword(changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    logout(res: Response): void;
    verifyEmail(body: VerifyEmail): Promise<{
        message: string;
    }>;
}
