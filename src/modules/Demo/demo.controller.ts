import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DemoService } from './demo.service'; // 确保路径正确
import { DemoDto } from './demo.dto'; // 确保路径正确

@ApiTags('Demo 管理')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post()
  @ApiOperation({ summary: '创建 Demo' })
  create(@Body() demoDto: DemoDto) {
    return this.demoService.create(demoDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有 Demo' })
  findAll() {
    return this.demoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 ID 获取 Demo' })
  findOne(@Param('id') id: string) {
    return this.demoService.findOne(id);
  }

  @Put('')
  @ApiOperation({ summary: '更新 Demo' })
  update(@Body() demoDto: DemoDto) {
    return this.demoService.update(demoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除 Demo' })
  remove(@Param('id') id: string) {
    return this.demoService.remove(id);
  }
}
