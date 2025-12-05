import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserVerifcationShema } from '@src/infrastructure/modal/users-verifications';
import { UserVerificationService } from '../service/verification.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User_Verification', schema: UserVerifcationShema }]),
  ],
  providers: [UserVerificationService],
  //   controllers: [StoreController],
  exports: [MongooseModule],
})
export class UserVerificationModule {}
