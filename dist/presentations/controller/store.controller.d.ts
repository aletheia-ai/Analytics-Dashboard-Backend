import { StoreService } from '../service/store.service';
import { AddStoreDto } from '../dto/store';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    addNewStore(addStoreDto: AddStoreDto): Promise<{
        message: string;
    }>;
}
