import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class DemoTask {
  @Cron('*/5 * * * * *')
  getTime() {
    Logger.log('Demo task executed')
  }
}
