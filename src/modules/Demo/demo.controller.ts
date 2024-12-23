import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DemoService } from './demo.service';
import { DemoDto } from './demo.dto';

@ApiTags('Demo 管理')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get('getDemoList')
  @ApiOperation({ summary: '获取所有 Demo' })
  getDemoList() {
    return this.demoService.getDemoList();
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
