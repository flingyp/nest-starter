import { Module } from '@nestjs/common';
import { CommonController } from './index.controller';
import { CommonService } from './index.service';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
