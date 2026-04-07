# Nest Starter

一个基于 NestJS 框架的现代化启动模板，集成了常用功能和最佳实践。

## ✨ 功能特性

- 🚀 **NestJS 11.x**
- 📝 **Swagger/OpenAPI** 文档自动生成
- 🔐 **全局异常处理** 统一错误响应
- 📦 **统一响应格式** 保持 API 响应一致性
- 🔧 **环境配置管理** 支持 YAML 配置
- 📋 **请求参数验证** 基于 class-validator
- 📊 **Winston 日志系统** 支持按天轮转
- ⏰ **定时任务** 基于 @nestjs/schedule
- 🗄️ **TypeORM + MySQL** 数据库支持（待配置）
- 📎 **阿里云 OSS** 文件上传集成
- 💾 **Redis** 缓存支持（待配置）
- 🔨 **ESLint + Prettier** 代码格式化
- 🌐 **CORS** 跨域支持
- 🛡️ **Helmet** 安全头设置
- 📈 **API 版本控制** 支持

## 🏗️ 项目结构

```
src/
├── config/                 # 配置文件
│   └── app.config.ts      # 应用配置
├── entities/              # 数据库实体 (TypeORM)
├── filters/               # 全局异常过滤器
│   └── GlobalHttpExceptionFilter.ts
├── interceptors/          # 全局拦截器
│   └── GlobalResponseInterceptor.ts
├── modules/               # 业务模块
│   ├── Auth/             # 认证模块
│   ├── Common/           # 公共工具模块
│   ├── Demo/             # 示例模块
│   └── index.ts          # 模块导出
├── schedules/            # 定时任务
│   ├── DemoTask.ts       # 示例定时任务
│   └── index.ts          # 任务导出
├── utils/                # 工具类
│   └── WinstonLogger.ts  # Winston 日志服务
├── app.module.ts         # 根应用模块
└── main.ts              # 应用入口文件
```

## 🚀 快速开始

### 环境要求

- **Node.js** >= 16
- **pnpm**（推荐）或 npm/yarn
- **MySQL**（可选，用于数据库功能）
- **Redis**（可选，用于缓存）

### 安装

```bash
# 克隆仓库
git clone <repository-url>
cd nest-starter

# 安装依赖
pnpm install

# 复制环境配置文件
cp development.yaml.example development.yaml
cp production.yaml.example production.yaml

# 编辑配置文件，填入你的设置
```

### 开发

```bash
# 启动开发服务器（支持热重载）
pnpm start:dev

# 启动调试模式
pnpm start:debug

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start:prod
```

### 可用脚本

```bash
# 开发
pnpm start:dev          # 启动开发服务器
pnpm start:debug        # 启动调试模式

# 生产
pnpm build              # 构建生产版本
pnpm start:prod         # 启动生产服务器

# 代码质量
pnpm lint               # 运行 ESLint 和 Prettier
pnpm lint:fix           # 自动修复 ESLint 问题

# 文档
pnpm build:compodoc     # 生成 API 文档
```

## ⚙️ 配置

项目使用 YAML 文件进行环境特定配置：

### 环境文件

- `development.yaml` - 开发环境
- `production.yaml` - 生产环境

### 配置结构

```yaml
# 应用设置
application:
  port: 8080
  prefix: api
  version: 1.0.0

# 数据库配置 (TypeORM)
mysql:
  host: localhost
  port: 3306
  username: root
  password: password
  db: database_name
  synchronize: false
  logging: true

# Redis 配置
redis:
  host: localhost
  port: 6379

# 阿里云 OSS 配置
oss:
  endpoint: your-oss-endpoint
  accessKeyId: your-access-key
  accessKeySecret: your-secret-key
  bucket: your-bucket-name
```

## 📚 API 文档

应用启动后，访问以下地址查看 Swagger 文档：

```
http://localhost:8080/swagger-docs
```

## 🔧 核心功能

### 统一响应格式

所有 API 响应都遵循一致的格式：

```typescript
{
  data: T // Response data
  code: number // HTTP status code
  message: string // Response message
  success: boolean // Success indicator
}
```

### 全局异常处理

自动错误处理，提供结构化错误响应：

```typescript
// 错误响应示例
{
  "data": null,
  "code": 400,
  "message": "Validation failed",
  "success": false
}
```

### 日志系统

基于 Winston 的日志系统，支持按天轮转：

```typescript
import { WinstonLogger } from '../../utils/WinstonLogger.js'

@Injectable()
export class ExampleService {
  @Inject(WinstonLogger)
  private readonly logger: WinstonLogger

  someMethod() {
    this.logger.log('信息日志')
    this.logger.error('错误日志', '堆栈跟踪')
    this.logger.warn('警告日志')
  }
}
```

### 定时任务

定时任务实现示例：

```typescript
import { Cron } from '@nestjs/schedule'

@Injectable()
export class DemoTask {
  @Cron('*/5 * * * * *') // 每5秒执行一次
  handleCron() {
    this.logger.log('定时任务已执行')
  }
}
```

### 文件上传到 OSS

阿里云 OSS 文件上传功能：

```typescript
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
async uploadFile(@UploadedFile() file: Express.Multer.File) {
  const result = await this.commonService.uploadFileToOSS(
    file.buffer.toString(),
    `/${file.originalname}`
  );
  return { url: result };
}
```

## 🛠️ 开发指南

### 模块结构

遵循既定的模块模式：

```
modules/
├── FeatureName/
│   ├── index.controller.ts    # 控制器
│   ├── index.service.ts       # 服务
│   ├── index.module.ts        # 模块定义
│   └── index.dto.ts          # 数据传输对象
```

### 参数验证

使用 class-validator 进行请求验证：

```typescript
import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
```

## 🔒 安全特性

- **Helmet** 安全头设置
- **CORS** 跨域配置
- **全局异常过滤**
- **请求参数验证**
- **API 版本控制** 支持

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支
3. 提交你的更改
4. 添加测试（如适用）
5. 提交 Pull Request

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 🆘 支持

如有问题或疑问：

1. 查看 [NestJS 文档](https://docs.nestjs.com/)
2. 查看现有问题
3. 创建新问题并提供详细信息

---

**使用 NestJS 构建 ❤️**
