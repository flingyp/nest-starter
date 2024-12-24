import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Auth 管理')
@Controller('auth')
export class AuthController {
  constructor() {}

  @ApiOperation({ summary: 'Hello Auth!' })
  @Get('hello')
  getHello(): string {
    return 'Hello Auth!';
  }
}
