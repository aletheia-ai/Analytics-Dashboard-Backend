import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from '../../applications/use-case/app.service';
import { AppController } from '../controller/app.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { PersonCountingModule } from './person-counting.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,

    UserModule,
    PersonCountingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
