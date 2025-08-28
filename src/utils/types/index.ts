import { BusinessType } from './business-type';
import { ServiceType } from './service-type';
import { UserSpaceType } from './space-type';
import { PersonStatsType } from './person-stats-type';
export enum SignInExceptions {
  NO_USER = 'No User Registered With this Email',
  INVALID_PASSWORD = 'Password Is Incorrect',
}

export enum UserRoleType {
  ADMIN = 'Admin',
  USER = 'User',
}

export type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  isAuthorized: boolean;
  userType: UserRoleType;
};

export { BusinessType, ServiceType, UserSpaceType, PersonStatsType };
