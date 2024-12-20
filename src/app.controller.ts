import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ValidationPipeDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  email: string;

  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('validationPipe')
  validationPipe(@Body() validationPipeDto: ValidationPipeDto) {
    return validationPipeDto;
  }
}
