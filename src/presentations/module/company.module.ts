import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from '@infrastructure/modal/company.schema';
import { CompanyService } from '@presentations/service/company.service';

import { CompanyController } from '../controller/company.controller';
import { UserModule } from './user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]), UserModule],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [MongooseModule],
})
export class CompanyModule {}
