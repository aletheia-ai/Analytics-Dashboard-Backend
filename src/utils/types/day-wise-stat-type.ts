import { PeopleCountingType } from './people-counting-type';
import { Store } from './store-type';

export interface DayWiseStatsType {
  store: Store | string;
  day: string;
  data: PeopleCountingType;
}
