import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { useFormatDate } from '@flypeng/tool/browser';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const now = useFormatDate('yyyy-MM-dd hh:mm:ss');

    Logger.log(`Request start... ${now}`, 'LoggerMiddleware');
    console.log(`\t\t\tRequest-URL: ${request.url}\t\t\t`);
    console.log(`\t\t\tRequest-Method: ${request.method}\t\t\t`);
    console.log(`\t\t\tRequest-Ip: ${request.ip}\t\t\t`);
    console.log(`\t\t\tRequest-QueryParams: ${JSON.stringify(request.query)}\t\t\t`);
    console.log(`\t\t\tRequest-Body: ${JSON.stringify(request.body)}\t\t\t`);
    Logger.log(`Request ending... ${now}`, 'LoggerMiddleware');

    next();
  }
}
