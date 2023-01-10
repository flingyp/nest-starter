import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { HttpExceptionFilter } from './filters/httpException/httpException.filter';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';

// application init
export const init = async (app: INestApplication) => {
  // enable request header protect
  app.use(helmet());

  // set global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // set global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // enable cors
  app.enableCors();
};

export interface GlobalConfiguration {
  port: number;
}

// application configuration
export default () => {
  const config: GlobalConfiguration = { port: 3000 };

  if (process.env.NODE_ENV === 'development') {
    // Development configuration
    config.port = 8081;
  } else if (process.env.NODE_ENV === 'prod') {
    // Prod configuration
  } else if (process.env.NODE_ENV === 'debug') {
    // Debug configuration
  }

  return config;
};
