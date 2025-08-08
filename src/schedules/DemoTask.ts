import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { useDayjs } from '@flypeng/tool/browser';
import { WinstonLogger } from '@/utils/WinstonLogger';

@Injectable()
export class DemoTask {
  @Inject(WinstonLogger)
  private readonly logger: WinstonLogger;

  private dayjs = useDayjs();

  // 每五秒钟执行一次
  @Cron('*/5 * * * * *')
  getTime() {
    this.logger.log(`当前时间: ${this.dayjs().format('YYYY-MM-DD')}`);
  }
}
