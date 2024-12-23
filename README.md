# Nest Starter

## 全局配置

- `config/app.config.ts`

## 环境配置

- 在 `package.json - scripts` 中配置 `cross-env` 设置Node环境变量，
- `config/app.config.ts` 中，通过 `process.env.NODE_ENV` 获取Node环境变量，从而读取不同Yaml环境的配置

ConfigModule 被注入为全局模块，所以在应用中可以通过 `ConfigService` 获取配置

## API 多版本控制

```ts
// config/app.config.ts
app.enableVersioning({
  type: VersioningType.HEADER,
  header: 'X-API-VERSION',
  defaultVersion: VERSION_NEUTRAL, // 默认全局路由无版本，不需要传递版本号标识
});

// 如果需要指定 Controller 或接口指定版本才有，则需要添加版本号标识，例如：
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 请求这个接口的时候，需要在请求头添加版本号标识 X-API-VERSION 并且值为 2
  @Get()
  @Version('2')
  getHello(): string {
    return this.appService.getHello();
  }
}
```

```ts
// main.ts
const configService = app.get(ConfigService);
const APPLICATION_PORT = configService.get<number>('application.port');
console.log('APPLICATION_PORT:', APPLICATION_PORT);

// other modules
constructor(private configService: ConfigService) {}
const APPLICATION_PORT = this.configService.get<number>('application.port');
```

## 全局响应拦截器 GlobalResponseInterceptor

`GlobalResponse` 全局响应类，用于统一返回格式，并且可以全局配置返回状态码

```json
{
  "data": "Hello World!",
  "code": 200,
  "message": "操作成功",
  "success": true
}
```

## 全局异常过滤器 GlobalHttpExceptionFilter

`GlobalHttpException` 全局异常类，用于统一处理异常，并且可以全局配置返回状态码

```json
{
  "data": null,
  "code": 409,
  "message": "这是一条自定义错误信息",
  "success": false
}
```

正常逻辑代码抛出异常，可以这么写

```ts
// HttpException 是 Nest 提供的基础异常类，基于 HttpException 类还有很多子类，例如 BadRequestException、NotFoundException、UnauthorizedException 等
throw new HttpException('这是一条自定义错误信息', HttpStatus.INTERNAL_SERVER_ERROR);
```

## 全局验证管道

在 `app.config.ts` 配置了内置的验证管道，可以全局使用，用于验证 DTO 层面参数的有效性

```ts
app.useGlobalPipes(new ValidationPipe());
```

使用方式：

```ts
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

  @Post('validationPipe')
  validationPipe(@Body() validationPipeDto: ValidationPipeDto) {
    return validationPipeDto;
  }
}
```

## 快速创建一个模块

模块目录结构参考：`modules/Demo`

- 执行命令 `nest generate resource modules_name --no-spec`
