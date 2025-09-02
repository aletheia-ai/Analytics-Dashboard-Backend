import { User } from '.';
import { BusinessType } from './business-type';
import { ServiceType } from './service-type';
import { UserSpaceType } from './space-type';

export interface Company {
  name: string;
  serviceType: ServiceType;
  userSpaceType: UserSpaceType;
  businessType: BusinessType;
  user: User | string;
  _id: string;
}
