import { StoreService } from '../service/store.service';
import { AddStoreDto, DeleteStoreDto, EditStoreDto, GetStoresDto } from '../dto/store';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    addNewStore(addStoreDto: AddStoreDto, req: any): Promise<{
        message: string;
        stores: import("../../utils/types/store-type").Store[];
        store: import("../../utils/types/store-type").Store;
    } | undefined>;
    deleteExistingStore(deleteStoreDto: DeleteStoreDto, req: any): Promise<{
        message: string;
        stores: import("../../utils/types/store-type").Store[] | null;
    } | undefined>;
    editExistingStore(EditStoreDto: EditStoreDto, req: any): Promise<{
        message: string;
        stores: import("../../utils/types/store-type").Store[];
    } | undefined>;
    getAllStores(getStoresDto: GetStoresDto): Promise<{
        message: import("../../utils/types/store-type").Store[];
    }>;
}
