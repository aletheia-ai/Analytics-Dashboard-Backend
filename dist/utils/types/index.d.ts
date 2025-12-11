import { BusinessType } from './business-type';
import { ServiceType } from './service-type';
import { UserSpaceType } from './space-type';
import { PersonStatsType } from './person-stats-type';
export * from './email-type';
export declare enum SignInExceptions {
    NO_USER = "No User Registered With this Email",
    INVALID_PASSWORD = "Password Is Incorrect"
}
export declare enum UserRoleType {
    ADMIN = "Admin",
    USER = "User"
}
export type User = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    isAuthorized: boolean;
    hasRegisteredBusiness: boolean;
    userType: UserRoleType;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
};
export { BusinessType, ServiceType, UserSpaceType, PersonStatsType };
