import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const path = request.url;
    const code = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException ? exception.getResponse() : exception.response?.data || '操作失败';

    Logger.error('HttpExceptionFilter:', exception);

    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(code).json({
      code,
      data: {
        path,
        timestamp: Date.now(),
      },
      message,
      success: false,
    });
  }
}
