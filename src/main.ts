import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await config(app);

  await app.listen(3000);
}
bootstrap();
