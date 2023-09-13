import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import helmet from 'helmet'
import { HttpExceptionFilter } from './filters/httpException/httpException.filter'
import { ResponseInterceptor } from './interceptors/response/response.interceptor'

// application init
export const init = async (
  app: INestApplication,
  configService: ConfigService,
) => {
  const APPLICATION_VERSION = configService.get<number>('version')
  const APPLICATION_PREFIX = configService.get<string>('prefix')

  // set global prefix
  app.setGlobalPrefix(APPLICATION_PREFIX)

  // set multi version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: `${APPLICATION_VERSION}`,
  })

  // enable request header protect
  app.use(helmet())

  // set global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor())

  // set global exception filter
  app.useGlobalFilters(new HttpExceptionFilter())

  // set global validation pipe
  app.useGlobalPipes(new ValidationPipe())

  // enable cors
  app.enableCors()
}

export type EnvironmentMode = 'development' | 'prod' | 'debug';
export interface GlobalConfiguration {
  mode: EnvironmentMode;
  port: number;
  version: number;
  prefix: string;
}

// application configuration
export default () => {
  const config: GlobalConfiguration = {
    mode: (process.env.NODE_ENV as EnvironmentMode) || 'development',
    port: 3000,
    version: 1,
    prefix: 'api',
  }

  if (config.mode === 'development') {
    // Development configuration
    config.port = 8081
  } else if (config.mode === 'prod') {
    // Prod configuration
  } else if (config.mode === 'debug') {
    // Debug configuration
  }

  return config
}
