import { StoreService } from '../service/store.service';
import { AddStoreDto, DeleteStoreDto, EditStoreDto, GetStoresDto } from '../dto/store';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    addNewStore(addStoreDto: AddStoreDto, req: any): Promise<{
        message: string;
    } | undefined>;
    deleteExistingStore(deleteStoreDto: DeleteStoreDto, req: any): Promise<{
        message: string;
    } | undefined>;
    editExistingStore(EditStoreDto: EditStoreDto, req: any): Promise<{
        message: string;
    } | undefined>;
    getAllStores(getStoresDto: GetStoresDto): Promise<{
        message: import("../../utils/types/store-type").Store[];
    }>;
}
