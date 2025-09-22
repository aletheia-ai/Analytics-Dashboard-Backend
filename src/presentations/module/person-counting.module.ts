import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PersonCountingController } from '../controller/person-counting.controller';
import { PersonCountingService } from '../service/person-counting.service';
import { PersonCountingSchema } from '@infrastructure/modal/person-counting.schema';
import { StoreModule } from './store.module';
import { StatsModule } from './stats.module';
import { AppGateway } from '@src/utils/shared/socket';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Person Counting', schema: PersonCountingSchema }]),
    StoreModule,
    StatsModule,
  ],
  providers: [PersonCountingService, AppGateway],
  controllers: [PersonCountingController],
  exports: [MongooseModule],
})
export class PersonCountingModule {}
