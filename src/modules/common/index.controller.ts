import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('公共模块')
@Controller('common')
export class CommonController {
  @ApiOperation({ summary: 'Hello Common!' })
  @Get('hello')
  getHello(): string {
    return 'Hello Common!'
  }
}
