//src/utils/methods/aggregated-stats.ts
import { PeopleCountingType } from '@src/utils/types/people-counting-type';
export function sumObjects(data: PeopleCountingType[]): PeopleCountingType {
  const result = data.reduce((acc, obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'number') {
        acc[key] = (acc[key] || 0) + obj[key];
      } else if (acc[key] === undefined) {
        acc[key] = obj[key];
      }
    }
    return acc;
  }, {} as any);

  return result;
}
