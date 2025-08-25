import { Model } from 'mongoose';
import type { Store } from '@utils/types/store-type';
export declare class StoreService {
    private store;
    constructor(store: Model<Store>);
    addNewStore(storeData: Store): Promise<{
        success: true;
    } | {
        success: false;
        error: Number;
    }>;
}
