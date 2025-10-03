import 'dotenv/config';

import Helmet from 'helmet';
import * as bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { rateLimiter } from '@utils/constants/rate-limiter';
import { AppModule } from '@presentations/module/app.module';
import { exceptionFactory } from '@utils/methods/exception-factory';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
dotenv.config();
async function bootstrap() {
  const httpsOptions={};
  const env = process.env.NODE_ENV;
  if(env === 'development'){
    httpsOptions = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem'),
  };
  }
 

  
  const app =
    env === 'development'
      ? await NestFactory.create(AppModule, { httpsOptions })
      : await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Brick&Mortars.ai')
    .setDescription('Endpoints')
    .setVersion('1.0')
    .addTag('User')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.setGlobalPrefix('api');
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: true, value: true },
      transform: true,
      exceptionFactory,
    })
  );
  app.use(rateLimit(rateLimiter));
  app.use(Helmet());
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  app.use(cookieParser());

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
