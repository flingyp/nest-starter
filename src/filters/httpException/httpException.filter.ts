import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const path = request.url;
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // TODO: 默认错误消息
    const message =
      exception instanceof HttpException ? exception.getResponse() : '操作失败';

    Logger.error(exception, 'HttpexceptionFilter');

    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(statusCode).json({
      path,
      statusCode,
      message,
      timestamp: Date.now(),
    });
  }
}
