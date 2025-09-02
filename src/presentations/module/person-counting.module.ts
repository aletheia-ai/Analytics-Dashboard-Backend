import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PersonCountingController } from '../controller/person-counting.controller';
import { PersonCountingService } from '../service/person-counting.service';
import { PersonCountingSchema } from '@infrastructure/modal/person-counting.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Person Counting', schema: PersonCountingSchema }])],
  providers: [PersonCountingService],
  controllers: [PersonCountingController],
})
export class PersonCountingModule {}
