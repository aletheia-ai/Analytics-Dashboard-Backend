import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from '@infrastructure/modal/store-schema';
import { StoreService } from '@presentations/service/store.service';
import { StoreController } from '../controller/store.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }])],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
