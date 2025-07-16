"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./presentations/module/app.module");
const bodyParser = require("body-parser");
const express_rate_limit_1 = require("express-rate-limit");
const helmet_1 = require("helmet");
console.log(process.env.MONGO_URL);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Brick&Mortars.ai')
        .setDescription('Endpoints')
        .setVersion('1.0')
        .addTag('User')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.setGlobalPrefix('api');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.use((0, express_rate_limit_1.default)({
        windowMs: 60 * 60 * 1000,
        max: 1000,
        message: 'Too many requests, please try again after an hour',
        standardHeaders: true,
        legacyHeaders: false,
    }));
    app.use((0, helmet_1.default)());
    app.enableCors();
    app.enableShutdownHooks();
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map