import { Module } from '@nestjs/common';

import { AppService } from '../../applications/use-case/app.service';
import { AppController } from '../controller/app.controller';
import { UserController } from '../controller/user.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
