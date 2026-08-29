"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const global_exception_filters_1 = require("./modules/common/filters/global-exception.filters");
const common_1 = require("@nestjs/common");
const bodyParser = require("body-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Gestión Base - Distribuidora')
        .setDescription('La descripción de las  API  de la distribuidora')
        .setVersion('1.0')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, documentFactory);
    app.setGlobalPrefix('api', {
        exclude: [{ path: '/', method: common_1.RequestMethod.GET }],
    });
    app.useGlobalFilters(new global_exception_filters_1.GlobalExceptionFilter());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
    const router = app.getHttpAdapter().getInstance();
    console.log(router._router?.stack);
}
bootstrap();
//# sourceMappingURL=main.js.map