import { PeopleCountingType } from './people-counting-type';
import { RangeType } from './range-type';
import { Store } from './store-type';

export interface StatsType {
  store: Store | string;
  cameraId: string;
  range: RangeType;
  data: PeopleCountingType;
}
