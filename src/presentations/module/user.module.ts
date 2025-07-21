import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { UserSchema } from '@infrastructure/modal/user.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@utils/guards/auth.guard.';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [UserService, { provide: APP_GUARD, useClass: AuthGuard }],
  controllers: [UserController],
})
export class UserModule {}
