import { AuthService } from '../service/auth.service';
import { EmailService } from '@src/email/email.service';
import { UserService } from '../service/user.service';
import { UserVerificationService } from '@src/presentations/service/verification.service';
import { AuthorizeUserDto, ChangePasswordDto, DeleteAccountDto, SignInDto, SignUpDto, VerifyEmail } from '../dto/auth';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    private readonly userService;
    private readonly emailService;
    private readonly userVerificationService;
    constructor(authService: AuthService, userService: UserService, emailService: EmailService, userVerificationService: UserVerificationService);
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
        success: boolean;
        message: string;
    }>;
    verifyResetOTP(body: {
        email: string;
        otp: string;
    }): Promise<{
        success: boolean;
        message: string;
        userId: any;
    }>;
    resetPassword(body: {
        userId: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
