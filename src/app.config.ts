import { INestApplication } from '@nestjs/common';
import * as csurf from 'csurf';
import helmet from 'helmet';

export const config = async (app: INestApplication) => {
  // enable request header protect
  app.use(helmet());

  // enable csrf protect
  app.use(csurf());

  // enable cors
  app.enableCors();
};
