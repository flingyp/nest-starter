import { Global, Module } from '@nestjs/common';
import { CommonController } from './index.controller';
import { CommonService } from './index.service';
import { WinstonLogger } from 'src/utils/WinstonLogger';

@Global()
@Module({
  controllers: [CommonController],
  providers: [CommonService, WinstonLogger],
  exports: [WinstonLogger],
})
export class CommonModule {}
