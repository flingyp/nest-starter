# Nest Starter

一个基于 NestJS 框架的启动模板，集成了常用功能和最佳实践。

## 功能特性

- 🚀 基于 NestJS 10.x 版本
- 📝 集成 Swagger 文档
- 🔐 全局异常处理
- 📦 统一响应格式
- 🔧 环境配置管理
- 📋 参数验证
- 📊 Winston 日志系统
- ⏰ 定时任务
- 🗄️ TypeORM + MySQL
- 📎 阿里云 OSS
- 💾 Redis 支持
- 🔨 ESLint + Prettier 代码规范

## 项目结构

```sh
src
├── config # 配置文件
├── entities # 数据库实体
├── filters # 全局过滤器
├── interceptors # 全局拦截器
├── modules # 业务模块
│ ├── Auth # 认证模块
│ ├── Common # 公共模块
│ └── Demo # 示例模块
├── schedules # 定时任务
├── utils # 工具类
└── main.ts # 应用入口
```

## 快速开始

### 环境要求

- Node.js >= 16
- MySQL (可选)
- Redis (可选)

### 安装依赖

````

### 开发环境运行

```bash
npm run start:dev
````

## 环境配置

项目使用 YAML 文件进行环境配置，配置文件位于项目根目录：

- `development.yaml` - 开发环境配置
- `production.yaml` - 生产环境配置

主要配置项包括：

```yaml
# 应用配置
application:
  port: 8080
  prefix: 'api'
  version: 1.0.0

# MySQL配置
mysql:
  host: 'localhost'
  port: 3306
  username: 'root'
  password: 'root'
  database: 'your_database'

# Redis配置
redis:
  host: 'localhost'
  port: 6379

# 阿里云OSS配置
oss:
  endpoint: ''
  accessKeyId: ''
  accessKeySecret: ''
  bucket: ''
```

## API 文档

启动项目后，访问 `http://localhost:8080/swagger-docs` 查看 Swagger API 文档。

## 主要功能说明

### 全局响应格式

```typescript
{
  data: T; // 响应数据
  code: number; // 状态码
  message: string; // 提示信息
  success: boolean; // 请求是否成功
}
```

### 日志系统

使用 Winston 进行日志管理，日志文件保存在 `logs` 目录下：

- 按天轮转
- 自动压缩归档
- 支持多种日志级别

### 文件上传

支持文件上传至阿里云 OSS，需要在配置文件中设置相关参数。

### 定时任务

使用 `@nestjs/schedule` 实现定时任务，示例：

```typescript
@Cron('*/5 * * * * *')
handleCron() {
  // 每5秒执行一次
}
```

## 开发建议

1. 遵循 NestJS 官方的开发规范和最佳实践
2. 使用 DTO 进行数据验证和转换
3. 保持模块的独立性和可复用性
4. 合理使用依赖注入和装饰器

## 许可证

[MIT License](LICENSE)
