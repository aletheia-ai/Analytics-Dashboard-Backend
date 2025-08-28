import { StoreService } from '../service/store.service';
import { AddStoreDto } from '../dto/store';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    addNewStore(addStoreDto: AddStoreDto, req: any): Promise<{
        message: string;
    }>;
}
