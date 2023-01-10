import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { init } from './app.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get ConfigService Service
  const configService = app.get(ConfigService);

  // Application Port
  const APPLICATION_PORT = configService.get<string>('port');

  await init(app);

  await app.listen(APPLICATION_PORT);
}
bootstrap();
