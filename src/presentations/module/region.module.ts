import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionSchema } from '@infrastructure/modal/regions-schema';
import { RegionService } from '@presentations/service/region.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Region', schema: RegionSchema }])],
  providers: [RegionService],
})
export class RegionModule {}
