import { StoreService } from '../service/store.service';
import { AddStoreDto, GetStoresDto } from '../dto/store';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    addNewStore(addStoreDto: AddStoreDto, req: any): Promise<{
        message: string;
    }>;
    getAllStores(getStoresDto: GetStoresDto): Promise<{
        message: import("../../utils/types/store-type").Store[];
    }>;
}
