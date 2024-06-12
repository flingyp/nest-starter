import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { CreateUserDto } from './test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  // HttpService request forwarding
  @Get(':user')
  async getGithubUserInfo(@Param('user') user: string): Promise<AxiosResponse<any, any>> {
    const { data } = await this.httpService
      .request({
        method: 'get',
        url: `https://api.github.com/users/${user}`,
      })
      .toPromise();
    return data;
  }
}
