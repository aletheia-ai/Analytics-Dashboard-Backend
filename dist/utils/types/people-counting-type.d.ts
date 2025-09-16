import type { Store } from './store-type';
export interface PeopleCountingType {
    store: string | Store;
    enterCount: number;
    exitCount: number;
    maskCount: number;
    unMaskCount: number;
    maleCount: number;
    feMaleCount: number;
    cameraId: string;
    age_0_9_Count: number;
    age_10_18_Count: number;
    age_19_34_Count: number;
    age_35_60_Count: number;
    age_60plus_Count: number;
}
