import { BusinessType, ServiceType, UserSpaceType } from '@src/utils/types';
export declare class AddCompanyDto {
    name: string;
    userSpaceType: UserSpaceType;
    serviceType: ServiceType;
    businessType: BusinessType;
    user: string;
}
