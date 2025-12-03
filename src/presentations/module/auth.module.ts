import { Module } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthController } from '../controller/auth.controller';
import { UserModule } from '../module/user.module';
import { JwtModule } from '@nestjs/jwt';
import { StoreModule } from './store.module';
import { CompanyModule } from './company.module';
import { RegionModule } from './region.module';
import { EmailModule } from '@src/email/email.module';
@Module({
  imports: [
    UserModule,
    StoreModule,
    CompanyModule,
    RegionModule,
    EmailModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
