import { BusinessType } from './business-type';
import { ServiceType } from './service-type';
import { UserSpaceType } from './space-type';
import { PersonStatsType } from './person-stats-type';
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
};
export { BusinessType, ServiceType, UserSpaceType, PersonStatsType };
