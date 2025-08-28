import { Model } from 'mongoose';
import type { Store } from '@utils/types/store-type';
import type { Company } from '@src/utils/types/company-type';
import type { Region } from '@src/utils/types/region-type';
export declare class StoreService {
    private store;
    private company;
    private region;
    constructor(store: Model<Store>, company: Model<Company>, region: Model<Region>);
    addNewStore(storeData: Store, id: string): Promise<{
        success: true;
    } | {
        success: false;
        error: Number;
    }>;
}
