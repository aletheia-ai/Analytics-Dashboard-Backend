import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from '@infrastructure/modal/company.schema';
import { CompanyService } from '@presentations/service/company.service';

import { CompanyController } from '../controller/company.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }])],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
