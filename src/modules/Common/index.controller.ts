import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommonService } from './index.service';

@ApiTags('公共模块')
@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiOperation({ summary: 'Hello Common!' })
  @Get('hello')
  getHello(): string {
    return 'Hello Auth!';
  }
}
