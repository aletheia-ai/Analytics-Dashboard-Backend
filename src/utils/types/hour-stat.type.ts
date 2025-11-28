//src/utils/types/hour-stat.type.ts
import { PeopleCountingType } from './people-counting-type';
import { Store } from './store-type';

export interface HourWiseStatsType {
  store: Store | string;
  hour: number;
  data: PeopleCountingType;
}
