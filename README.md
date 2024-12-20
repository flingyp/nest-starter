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

## 快速创建一个模块

- 运行命令 `nest generate resource modules_name --no-spec`
