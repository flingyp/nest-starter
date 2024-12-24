import { Module } from '@nestjs/common';
import { DemoController } from './index.controller';
import { DemoService } from './index.service';

@Module({
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
