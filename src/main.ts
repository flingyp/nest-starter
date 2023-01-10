import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentMode, init } from './app.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService Service
  const configService = app.get(ConfigService);

  // Application environment various
  const APPLICATION_PORT = configService.get<string>('port');
  const APPLICATION_MODE = configService.get<EnvironmentMode>('mode');
  const APPLICATION_VERSION = configService.get<number>('version');
  const APPLICATION_PREFIX = configService.get<string>('prefix');

  await init(app, configService);

  await app.listen(APPLICATION_PORT, () => {
    Logger.verbose(
      `Current environment mode is ${APPLICATION_MODE}`,
      'ApplicationStart',
    );
    Logger.verbose(
      `Server running on http://localhost:${APPLICATION_PORT}/${APPLICATION_PREFIX}/v${APPLICATION_VERSION}`,
      'ApplicationStart',
    );
  });
}

bootstrap();
