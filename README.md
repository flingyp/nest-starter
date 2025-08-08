# Nest Starter

A modern NestJS starter template, integrated with common features and best practices.

## ✨ Features

- 🚀 **NestJS 11.x**
- 📝 **Swagger/OpenAPI** documentation
- 🔐 **Global exception handling** with unified error responses
- 📦 **Unified response format** for consistent API responses
- 🔧 **Environment configuration** with YAML support
- 📋 **Request validation** with class-validator
- 📊 **Winston logging** with daily rotation
- ⏰ **Scheduled tasks** with @nestjs/schedule
- 🗄️ **TypeORM + MySQL** (ready to configure)
- 📎 **Aliyun OSS** integration for file uploads
- 💾 **Redis** support (ready to configure)
- 🔨 **ESLint + Prettier** code formatting
- 🌐 **CORS** enabled
- 🛡️ **Helmet** security headers
- 📈 **API versioning** support

## 🏗️ Project Structure

```
src/
├── config/                 # Configuration files
│   └── app.config.ts      # Application configuration
├── entities/              # Database entities (TypeORM)
├── filters/               # Global exception filters
│   └── GlobalHttpExceptionFilter.ts
├── interceptors/          # Global interceptors
│   └── GlobalResponseInterceptor.ts
├── modules/               # Business modules
│   ├── Auth/             # Authentication module
│   ├── Common/           # Common utilities module
│   ├── Demo/             # Example module
│   └── index.ts          # Module exports
├── schedules/            # Scheduled tasks
│   ├── DemoTask.ts       # Example scheduled task
│   └── index.ts          # Task exports
├── utils/                # Utility classes
│   └── WinstonLogger.ts  # Winston logger service
├── app.module.ts         # Root application module
└── main.ts              # Application entry point
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 16
- **pnpm** (recommended) or npm/yarn
- **MySQL** (optional, for database features)
- **Redis** (optional, for caching)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nest-starter

# Install dependencies
pnpm install

# Copy environment configuration
cp development.yaml.example development.yaml
cp production.yaml.example production.yaml

# Edit configuration files with your settings
```

### Development

```bash
# Start development server with hot reload
pnpm start:dev

# Start with debug mode
pnpm start:debug

# Build for production
pnpm build

# Start production server
pnpm start:prod
```

### Available Scripts

```bash
# Development
pnpm start:dev          # Start development server
pnpm start:debug        # Start with debug mode

# Production
pnpm build              # Build for production
pnpm start:prod         # Start production server

# Code Quality
pnpm lint               # Run ESLint and Prettier
pnpm lint:fix           # Fix ESLint issues automatically

# Documentation
pnpm build:compodoc     # Generate API documentation
```

## ⚙️ Configuration

The project uses YAML files for environment-specific configuration:

### Environment Files

- `development.yaml` - Development environment
- `production.yaml` - Production environment

### Configuration Structure

```yaml
# Application settings
application:
  port: 8080
  prefix: 'api'
  version: '1.0.0'

# Database configuration (TypeORM)
mysql:
  host: 'localhost'
  port: 3306
  username: 'root'
  password: 'password'
  db: 'database_name'
  synchronize: false
  logging: true

# Redis configuration
redis:
  host: 'localhost'
  port: 6379

# Aliyun OSS configuration
oss:
  endpoint: 'your-oss-endpoint'
  accessKeyId: 'your-access-key'
  accessKeySecret: 'your-secret-key'
  bucket: 'your-bucket-name'
```

## 📚 API Documentation

Once the application is running, access the Swagger documentation at:

```
http://localhost:8080/swagger-docs
```

## 🔧 Key Features

### Unified Response Format

All API responses follow a consistent format:

```typescript
{
  data: T; // Response data
  code: number; // HTTP status code
  message: string; // Response message
  success: boolean; // Success indicator
}
```

### Global Exception Handling

Automatic error handling with structured error responses:

```typescript
// Example error response
{
  "data": null,
  "code": 400,
  "message": "Validation failed",
  "success": false
}
```

### Logging System

Winston-based logging with daily rotation:

```typescript
import { WinstonLogger } from '../../utils/WinstonLogger.js';

@Injectable()
export class ExampleService {
  @Inject(WinstonLogger)
  private readonly logger: WinstonLogger;

  someMethod() {
    this.logger.log('Info message');
    this.logger.error('Error message', 'stack trace');
    this.logger.warn('Warning message');
  }
}
```

### Scheduled Tasks

Example scheduled task implementation:

```typescript
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DemoTask {
  @Cron('*/5 * * * * *') // Every 5 seconds
  handleCron() {
    this.logger.log('Scheduled task executed');
  }
}
```

### File Upload to OSS

File upload functionality with Aliyun OSS:

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

## 🛠️ Development Guidelines

### Module Structure

Follow the established module pattern:

```
modules/
├── FeatureName/
│   ├── index.controller.ts    # Controllers
│   ├── index.service.ts       # Services
│   ├── index.module.ts        # Module definition
│   └── index.dto.ts          # Data transfer objects
```

### Validation

Use class-validator for request validation:

```typescript
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
```

## 🔒 Security Features

- **Helmet** for security headers
- **CORS** configuration
- **Global exception filtering**
- **Request validation**
- **API versioning** support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🆘 Support

For issues and questions:

1. Check the [NestJS documentation](https://docs.nestjs.com/)
2. Review existing issues
3. Create a new issue with detailed information

---

**Built with ❤️ using NestJS**
