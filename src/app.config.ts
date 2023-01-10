import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { HttpExceptionFilter } from './filters/httpException/httpException.filter';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';

export const config = async (app: INestApplication) => {
  // enable request header protect
  app.use(helmet());

  // set global response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // set global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // enable cors
  app.enableCors();
};
