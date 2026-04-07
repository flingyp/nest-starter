import type { INestApplication } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { GlobalHttpExceptionFilter } from '@/filters/global-http-exception-filter'
import { GlobalResponseInterceptor } from '@/interceptors/global-response-interceptor'

export async function initApplication(
  app: INestApplication,
  configService: ConfigService,
) {
  const APP_PREFIX = configService.get<string>('APP_PREFIX')
  const APP_VERSION = configService.get<string>('APP_VERSION')

  app.setGlobalPrefix(APP_PREFIX ?? '')

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'X-API-VERSION',
    defaultVersion: VERSION_NEUTRAL,
  })

  app.useGlobalInterceptors(new GlobalResponseInterceptor())

  app.useGlobalFilters(new GlobalHttpExceptionFilter())

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  app.useGlobalPipes(new ValidationPipe())

  app.use(helmet())

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('NestJS Starter API')
    .setDescription('NestJS Starter API Description')
    .setVersion(APP_VERSION ?? '1.0.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/swagger-docs', app, document)
}
