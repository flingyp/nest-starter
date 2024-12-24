import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DemoService } from './index.service';
import { DemoDto } from './index.dto';

@ApiTags('Demo 管理')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post('getList')
  @ApiOperation({ summary: '获取 Demo 列表' })
  getList() {
    return this.demoService.getList();
  }

  @Get('getById')
  @ApiOperation({ summary: '根据 ID 获取 Demo' })
  getById(@Query('id') id: string) {
    return this.demoService.getById(id);
  }

  @Post('createDemo')
  @ApiOperation({ summary: '创建 Demo' })
  createDemo(@Body() demoDto: DemoDto) {
    return this.demoService.createDemo(demoDto);
  }

  @Post('updateDemo')
  @ApiOperation({ summary: '更新 Demo' })
  updateDemo(@Body() demoDto: DemoDto) {
    return this.demoService.updateDemo(demoDto);
  }

  @Post('removeById')
  @ApiOperation({ summary: '删除 Demo' })
  removeById(@Query('id') id: string) {
    return this.demoService.removeById(id);
  }
}
