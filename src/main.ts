import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { initApplication } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const APPLICATION_PORT = configService.get<number>('application.port');
  const APPLICATION_PREFIX = configService.get<string>('application.prefix');

  await initApplication(app, configService);

  await app.listen(APPLICATION_PORT ?? 3000, () => {
    const BASE_URL = `http://localhost:${APPLICATION_PORT}`;
    Logger.verbose(`服务运行在: ${BASE_URL}/${APPLICATION_PREFIX ?? ''}`, '服务启动');
    Logger.verbose(`Swagger 文档运行在: ${BASE_URL}/swagger-docs`, '服务启动');
  });
}
bootstrap();
