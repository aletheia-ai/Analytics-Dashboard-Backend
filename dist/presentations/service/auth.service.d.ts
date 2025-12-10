import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInExceptions, User } from '@utils/types';
import { Model } from 'mongoose';
import { Store } from '@src/utils/types/store-type';
import { Company } from '@src/utils/types/company-type';
import { Region } from '@src/utils/types/region-type';
import { UserVerificationService } from './verification.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private store;
    private company;
    private region;
    constructor(usersService: UserService, jwtService: JwtService, verificationService: UserVerificationService, store: Model<Store>, company: Model<Company>, region: Model<Region>);
    getUserProfile(id: string): Promise<{
        success: true;
        company: Company | null;
        stores: Store[] | null;
        regions: Region[];
        user: User;
    } | {
        success: false;
        error: number;
    }>;
    authorizeUser(userId: string): Promise<{
        success: true;
        access_token: string;
    } | {
        success: false;
        error: number;
    }>;
    verifyUser(userId: string): Promise<{
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
    deleteAccount(userId: string): Promise<{
        success: true;
    } | {
        success: false;
        error: number;
        errorType: 'user' | 'company' | 'stores' | 'other';
    }>;
    changeUserPassword({ userId, password, newPassword, }: {
        userId: string;
        password: string;
        newPassword: string;
    }): Promise<{
        success: true;
    } | {
        success: false;
        error: number;
    }>;
    findByEmail(email: string): Promise<{
        success: true;
        data: User;
    } | {
        success: false;
        error: number;
        message: string;
    }>;
    resetPassword(userId: string, newPassword: string): Promise<{
        success: true;
    } | {
        success: false;
        error: number;
    }>;
}
