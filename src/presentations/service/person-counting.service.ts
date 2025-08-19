import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { BusinessType, ServiceType, UserRoleType, UserSpaceType, type User } from '@utils/types';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { PersonStatsType } from '@utils/types/person-stats-type';

dotenv.config();

@Injectable()
export class PersonCountingService {
  private readonly personStats: PersonStatsType = {
    maleCount: 2,
    femaleCount: 4,
    exit: 0,
    age: [8, 33, 10, 67, 45, 51],
    occupancy: 6,
    footFall: 6,
  };

  async getStats(): Promise<
    { success: true; data: PersonStatsType } | { success: false; err: string }
  > {
    try {
      return { success: true, data: this.personStats };
    } catch (err) {
      if (err instanceof Error) {
        return { success: false, err: err.message };
      }
      return { success: false, err: 'Something Went Wrong' };
    }
  }
}
