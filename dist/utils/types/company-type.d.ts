import { User } from '.';
import { BusinessType } from './business-type';
import { ServiceType } from './service-type';
export interface Company {
    name: string;
    serviceType: ServiceType;
    businessType: BusinessType;
    user: User | string;
    _id: string;
    registrationNumber: string;
    email: string;
    country: string;
    state: string;
    city: string;
    address: string;
    phone: string;
}
