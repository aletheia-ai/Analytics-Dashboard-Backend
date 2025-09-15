import { Model } from 'mongoose';
import type { Store } from '@utils/types/store-type';
import type { Company } from '@src/utils/types/company-type';
import type { Region } from '@src/utils/types/region-type';
export declare class StoreService {
    private store;
    private company;
    private region;
    constructor(store: Model<Store>, company: Model<Company>, region: Model<Region>);
    deleteStore(companyId: string, userId: string, storeId: string): Promise<{
        success: true;
        stores: Store[];
    } | {
        success: false;
        error: Number;
        errorType: 'conflict' | 'forbidden' | 'company' | 'other' | 'region' | 'store';
    }>;
    editExistingStore(storeData: Store, id: string, storeId: string): Promise<{
        success: true;
        stores: Store[];
    } | {
        success: false;
        error: Number;
        errorType: 'conflict' | 'forbidden' | 'company' | 'other' | 'region' | 'store';
    }>;
    addNewStore(storeData: Store, id: string): Promise<{
        success: true;
        stores: Store[];
    } | {
        success: false;
        error: Number;
        errorType: 'conflict' | 'forbidden' | 'company' | 'other' | 'region' | 'store';
    }>;
    getAllStores(companyId: string): Promise<{
        success: false;
        error: number;
        errorFrom: 'Company' | 'Store';
    } | {
        success: true;
        data: Store[];
    }>;
}
