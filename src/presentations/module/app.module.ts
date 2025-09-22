import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from '../../applications/use-case/app.service';
import { AppController } from '../controller/app.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { RegionModule } from './region.module';
import { PersonCountingModule } from './person-counting.module';
import { StoreModule } from './store.module';
import { CompanyModule } from './company.module';
import { RedisModule } from '@src/utils/shared/redis/redis.module';
import { AppGateway } from '@src/utils/shared/socket';
import { StatsModule } from './stats.module';
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
    // AppGateway,
    AuthModule,
    UserModule,
    RedisModule,
    PersonCountingModule,
    RegionModule,
    StoreModule,
    CompanyModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
