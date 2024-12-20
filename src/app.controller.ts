import { Controller, Get, Header, HttpException, HttpStatus, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ResponseInstance } from './interceptors/GlobalResponseInterceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
