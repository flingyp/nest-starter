import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { DemoService } from './index.service';
import { DemoDto } from './index.dto';

export class ValidationPipeDto {
  @ApiProperty({ example: '123456789@qq.com', description: '邮箱' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @ApiProperty({ example: '123456', description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

@ApiTags('Demo 管理')
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Post('getDemoList')
  @ApiOperation({ summary: '获取 Demo 列表' })
  getDemoList() {
    return this.demoService.getDemoList();
  }

  @Get('getDemoById')
  @ApiOperation({ summary: '根据 ID 获取 Demo' })
  getDemoById(@Query('id') id: string) {
    return this.demoService.getDemoById(id);
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

  @Post('deleteDemoById')
  @ApiOperation({ summary: '删除 Demo' })
  deleteDemoById(@Query('id') id: string) {
    return this.demoService.deleteDemoById(id);
  }

  @Post('校验接口参数例子')
  validationPipe(@Body() validationPipeDto: ValidationPipeDto) {
    return validationPipeDto;
  }
}
