import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { initApplication } from './config/app.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const APP_PORT = configService.get<number>('APP_PORT') ?? 3000
  const APP_PREFIX = configService.get<string>('APP_PREFIX')

  await initApplication(app, configService)

  await app.listen(APP_PORT, () => {
    const BASE_URL = `http://localhost:${APP_PORT}`
    Logger.verbose(`服务运行在: ${BASE_URL}/${APP_PREFIX ?? ''}`, '服务启动')
    Logger.verbose(`Swagger 文档运行在: ${BASE_URL}/swagger-docs`, '服务启动')
  })
}
bootstrap()
