import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInExceptions, User } from '@utils/types';
import { Model } from 'mongoose';
import { Store } from '@src/utils/types/store-type';
import { Company } from '@src/utils/types/company-type';
export declare class AuthService {
    private usersService;
    private jwtService;
    private store;
    private company;
    constructor(usersService: UserService, jwtService: JwtService, store: Model<Store>, company: Model<Company>);
    getUserProfile(id: string): Promise<{
        success: true;
        data: Company;
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
}
