import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config/app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DemoModule } from './modules/Demo/demo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    DemoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
