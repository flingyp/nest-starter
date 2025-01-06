import { Global, Module } from '@nestjs/common';
import { CommonController } from './index.controller';
import { WinstonLogger } from 'src/utils/WinstonLogger';
import { CommonService } from './index.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  controllers: [CommonController],
  providers: [
    CommonService,
    WinstonLogger,
    // CHORE: Redis 配置，在 .yaml 配置好后开启
    // RedisService,
  ],
  exports: [
    CommonService,
    WinstonLogger,
    // CHORE: Redis 配置，在 .yaml 配置好后开启
    // RedisService,
  ],
})
export class CommonModule {}
