import type { Store } from './store-type';
export interface PeopleCountingType {
  // store: string | Store;
  enterCount: number;
  exitCount: number;
  maskCount: number;
  unMaskCount: number;
  maleCount: number;
  feMaleCount: number;
  cameraId: string;
  passingBy: number;
  teen: number;
  child: number;
  adult: number;
  middle_age: number;
  old_age: number;
  interestedCustomers: number;
  buyingCustomers: number;
  liveOccupancy: number;
}
