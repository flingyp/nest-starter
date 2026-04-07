import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Auth 管理')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: 'Hello Auth!' })
  @Get('hello')
  getHello() {
    return 'Hello Auth!'
  }
}
