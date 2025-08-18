import { BusinessType, ServiceType, UserSpaceType } from '@utils/types';
export declare class SignUpDto {
    email: string;
    password: string;
    name: string;
    companyName: string;
    bussinessType: BusinessType;
    serviceType: ServiceType;
    userSpaceType: UserSpaceType;
    branchCount: number;
}
