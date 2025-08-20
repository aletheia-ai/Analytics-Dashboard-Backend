export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export enum QueueLocations {
  ALL_LOCATIONS = 'All Locations',
  CITY_CENTERS = 'City Centers',
}
export interface OperationalKpiType {
  counter: number;
  driveThrough: number;
  seating: number;
}

export type QueueLocationType = {
  [keys in QueueLocations]: OperationalKpiType;
};

export interface PersonStatsType {
  footFall: number;
  exit: number;
  age: number[];
  maleCount: number;
  femaleCount: number;
  occupancy: number;
  queueStats: QueueLocationType;
}
