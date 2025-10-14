import { BusinessType, ServiceType } from '@src/utils/types';
export declare class EditCompanyDto {
    id: string;
    name: string;
    serviceType: ServiceType;
    businessType: BusinessType;
    user: string;
    registrationNumber: string;
    email: string;
    country: string;
    state: string;
    city: string;
    address: string;
    phone: string;
}
