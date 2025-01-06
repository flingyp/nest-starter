import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import config from './config/app.config';

import { DemoModule, CommonModule, AuthModule } from './modules';

import { DemoTask } from './schedules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    // CHORE: TypeORM 配置，在 .yaml 配置好后开启
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const config = configService.get('mysql');
    //     return {
    //       type: 'mysql',
    //       host: config.host,
    //       port: config.port,
    //       username: config.username,
    //       password: config.password,
    //       database: config.db,
    //       entities: [],
    //       synchronize: config.synchronize || false,
    //       logging: config.logging || true,
    //     };
    //   },
    // }),
    // 任务调度模块
    ScheduleModule.forRoot(),
    DemoModule,
    CommonModule,
    AuthModule,
  ],
  providers: [DemoTask],
})
export class AppModule {}
