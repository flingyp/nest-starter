import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RedisClientType } from 'redis';
import { WinstonLogger } from 'src/utils/WinstonLogger';

@ApiTags('Auth 管理')
@Controller('auth')
export class AuthController {
  constructor() {}

  @Inject(WinstonLogger)
  private readonly logger: WinstonLogger;

  @ApiOperation({ summary: 'Hello Auth!' })
  @Get('hello')
  async getHello() {
    this.logger.log('Doing something...');

    // 其它逻辑
    try {
      // 尝试可能引发错误的操作
      this.logger.warn('Warning something...');
      return 'Hello Auth!';
    } catch (error) {
      this.logger.error('An error occurred', error.trace);
    }
  }
}
