import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';
import { CommonController } from './index.controller';
import { CommonService } from './index.service';
import { WinstonLogger } from 'src/utils/WinstonLogger';

@Global()
@Module({
  controllers: [CommonController],
  providers: [
    CommonService,
    WinstonLogger,

    // CHORE: Redis 配置，在 .yaml 配置好后开启
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const config = configService.get('redis');
        const client = createClient({
          socket: {
            host: config.host,
            port: config.port,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [WinstonLogger, 'REDIS_CLIENT'],
})
export class CommonModule {}
