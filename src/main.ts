import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./presentations/module/app.module";
import * as bodyParser from "body-parser";
import Helmet from "helmet";
import rateLimit from "express-rate-limit";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Brick&Mortars.ai")
    .setDescription("Endpoints")
    .setVersion("1.0")
    .addTag("User")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  app.setGlobalPrefix("api");
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
  app.use(
    rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 1000,
      message: "Too many requests, please try again after an hour",
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
  app.use(Helmet());
  app.enableCors();
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
