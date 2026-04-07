import { Global, Module } from '@nestjs/common'
import { CommonController } from './index.controller'
import { CommonService } from './index.service'

@Global()
@Module({
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
