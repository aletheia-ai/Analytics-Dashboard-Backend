import { BusinessType } from './business-type';
import { ServiceType } from './service-type';
import { UserSpaceType } from './space-type';
export enum SignInExceptions {
  NO_USER = 'No User Registered With this Email',
  INVALID_PASSWORD = 'Password Is Incorrect',
}

export type User = {
  email: string;
  password: string;
  name: string;
  companyName: string;
  bussinessType: BusinessType;
  serviceType: ServiceType;
  userSpaceType: UserSpaceType;
  branchCount: number;
};

export { BusinessType, ServiceType, UserSpaceType };
