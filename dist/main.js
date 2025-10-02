"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const helmet_1 = require("helmet");
const bodyParser = require("body-parser");
const express_rate_limit_1 = require("express-rate-limit");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rate_limiter_1 = require("./utils/constants/rate-limiter");
const app_module_1 = require("./presentations/module/app.module");
const exception_factory_1 = require("./utils/methods/exception-factory");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('./localhost-key.pem'),
        cert: fs.readFileSync('./localhost.pem'),
    };
    const env = process.env.NODE_ENV;
    const app = env === 'development'
        ? await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions })
        : await core_1.NestFactory.create(app_module_1.AppModule);
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
        validationError: { target: true, value: true },
        transform: true,
        exceptionFactory: exception_factory_1.exceptionFactory,
    }));
    app.use((0, express_rate_limit_1.default)(rate_limiter_1.rateLimiter));
    app.use((0, helmet_1.default)());
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
//# sourceMappingURL=main.js.map