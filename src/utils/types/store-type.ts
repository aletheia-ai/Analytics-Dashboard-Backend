import { Company } from './company-type';
import { Region } from './region-type';

export interface Store {
  region: Region | string;
  name: string;
  company: Company | string;
  phone: string;
  city: string;
}
