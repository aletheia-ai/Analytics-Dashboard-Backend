//src/presentations/module/company.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from '@infrastructure/modal/company.schema';
import { CompanyService } from '@presentations/service/company.service';
import { JwtModule } from '@nestjs/jwt';
import { CompanyController } from '../controller/company.controller';
import { UserModule } from './user.module';
import { EmailModule } from '@src/email/email.module'; // Add this import
import { UserVerificationModule } from './verifications.module'; // Add this
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]), UserModule, JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '24h' },
      }),
    }),EmailModule,UserVerificationModule, ],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [MongooseModule],
})
export class CompanyModule {}
