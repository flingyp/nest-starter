import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { CommonController } from './index.controller';
import { WinstonLogger } from 'src/utils/WinstonLogger';
import { CommonService } from './index.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  controllers: [CommonController],
  providers: [
    // CHORE: Redis 配置，在 .yaml 配置好后开启
    // {
    //   provide: 'REDIS_CLIENT',
    //   inject: [ConfigService],
    //   async useFactory(configService: ConfigService) {
    //     const config = configService.get('redis');
    //     const client = createClient({
    //       socket: {
    //         host: config.host,
    //         port: config.port,
    //       },
    //     });
    //     await client.connect();
    //     return client;
    //   },
    // },

    CommonService,
    WinstonLogger,
    // CHORE: Redis 配置，在 .yaml 配置好后开启
    // RedisService,
  ],
  exports: [
    CommonService,
    WinstonLogger,

    // CHORE: Redis 配置，在 .yaml 配置好后开启
    // 'REDIS_CLIENT',
    // RedisService
  ],
})
export class CommonModule {}
