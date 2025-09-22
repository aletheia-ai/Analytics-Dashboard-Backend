import { User } from '.';
import { PeopleCountingType } from './people-counting-type';
import { Store } from './store-type';

export interface StatsType {
  store: Store | string;

  data: PeopleCountingType;
}
