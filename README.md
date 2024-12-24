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

- 参考 Demo模块：`modules/Demo`
- 也可执行命令创建模块 `nest generate resource modules_name --no-spec`

## 集成阿里云OSS

在 `.yaml` 文件配置自己的阿里云OSS配置即可

上传文件的接口在 `modules/Common/index.controller.ts` 中，可以参考使用

```yaml
# 阿里OSS配置
oss:
  endpoint: ''
  accessKeyId: ''
  accessKeySecret: ''
  bucket: ''
```

## `compodoc` 生成文档

`compodoc` 本来是给 Angular 项目生成项目文档的，但是因为 Angular 和 NestJS 项目结构类似，所以也支持了 NestJS

它会列出项目的模块，可视化展示模块之间的依赖关系，展示每个模块下的 provider、exports 等

安装：`pnpm add @compodoc/compodoc -D`

- 生成文档：`npx @compodoc/compodoc -p tsconfig.json -s -o`
- -p 是指定 tsconfig 文件
- -s 是启动静态服务器
- -o 是打开浏览器

> 更多选项参考文档：[compodoc](https://compodoc.app/guides/options.html)
