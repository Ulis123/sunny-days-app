import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { useContainer } from "class-validator";
import * as compression from "compression";
import helmet from "helmet";

import { AppModule } from "./app.module";
import { TypeOrmExceptionFilter } from "src/filters/type-orm-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configService = app.get(ConfigService);
  const port = configService.get("port");
  const client = configService.get("clientUrl");

  app.setGlobalPrefix("api");
  app.enableCors({
    origin: client,
  });

  app.use(compression());
  app.use(helmet());

  const logger = new Logger("bootstrap");
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
