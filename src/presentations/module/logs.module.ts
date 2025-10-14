import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { StoreSchema } from '@infrastructure/modal/store-schema';
import { StoreService } from '@presentations/service/store.service';
import { StoreController } from '../controller/store.controller';

import { logSchema } from '@src/infrastructure/modal/logs.schema';
import { LogService } from '../service/log.service';
import { LogController } from '../controller/log.controller';
import { AppGateway } from '@src/utils/shared/socket';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Log', schema: logSchema }])],
  providers: [LogService, AppGateway],
  controllers: [LogController],
  exports: [MongooseModule],
})
export class LogModule {}
