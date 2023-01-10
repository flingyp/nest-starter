import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';

@Controller('test')
export class TestController {
  @Get('')
  testDemo() {
    return 'Hello World';
  }
}
