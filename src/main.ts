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

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.cert'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
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
    origin: 'https://localhost:5173', // your frontend origin
    credentials: true,
  });
  app.use(cookieParser());

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
