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
import { StatsModule } from './stats.module';

import { DayWiseStatsModule } from './day-wise-stats.module';

import { HourWiseStatsModule } from './hour-stat.module';
import { HeatMapsModule } from './heatmap.module';
import { SocketModule } from './socket.module';
import { RestauranAnalyticsModule } from './restaurant-analytics.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        autoIndex: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    RedisModule,
    PersonCountingModule,
    RegionModule,
    StoreModule,
    CompanyModule,
    StatsModule,
    HeatMapsModule,
    DayWiseStatsModule,
    HourWiseStatsModule,
    SocketModule,
    RestauranAnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: [AppGateway],
})
export class AppModule {}
