# Nest Starter

## 环境配置和全局配置

一般在 `development.yaml` 和 `production.yaml` 配置好不同环境的配置，然后在 `config/app.config.ts` 中通过 `ConfigModule.forRoot()` 方法加载配置文件，并且之后可以通过 `ConfigService` 在引用中任何地方获取配置信息

在 `scripts` 脚本中，通过 `cross-env` 设置Node环境变量，从而读取不同Yaml环境的配置

```json
{
  "scripts": {
    "start:dev": "cross-env NODE_ENV=development nest start --watch",
    "start:debug": "cross-env NODE_ENV=development nest start --debug --watch",
    "start:prod": "cross-env NODE_ENV=production node dist/main"
  }
}
```

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

## 系统日志输出和管理

- [集成文档](https://www.levenx.com/article/how-to-use-winston-logging-system-in-nestjs)

正常情况下，如果只需要在控制台输出日志打印信息即可，我们可以使用 NestJS 提供的 Logger 类或者直接使用 `console.log` 输出日志信息。但是当系统变得复杂的时候，我们可能需要将日志输出到文件中，或者使用日志管理系统来管理日志，这时候就需要用到日志框架 Winston

项目中在 `utils/WinstonLogger` 定义了一个 `WinstonLogger` 类并且在 Common 全局模块导出，这样就可以在项目中直接使用 `WinstonLogger` 类来输出日志信息了，日志会输出在 logs 文件夹下

```ts
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WinstonLogger } from 'src/utils/WinstonLogger';

export class AuthController {
  constructor() {}

  @Inject(WinstonLogger)
  private readonly logger: WinstonLogger;

  @ApiOperation({ summary: 'Hello Auth!' })
  @Get('hello')
  getHello(): string {
    this.logger.log('Doing something...');
    // 其它逻辑
    try {
      // 尝试可能引发错误的操作
      this.logger.warn('Warning something...');
      return 'Hello World!';
    } catch (error) {
      this.logger.error('An error occurred', error.trace);
    }
  }
}
```
