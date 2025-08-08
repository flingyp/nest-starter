import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseInstance } from '@/interceptors/GlobalResponseInterceptor';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // 处理异常
    const {
      code = HttpStatus.INTERNAL_SERVER_ERROR,
      message = '服务器内部错误',
    } = this.handleException(exception, request);

    // TODO: 记录错误日志(集成日志框架)
    this.logError(request, exception);

    // 发送响应
    response
      .status(code)
      .json(new ResponseInstance(null, code, message, false));
  }

  private handleException(exception: unknown, request: Request) {
    // 处理 HttpException 异常
    if (exception instanceof HttpException) {
      return this.handleHttpException(exception, request);
    }

    // 处理普通 Error 异常
    if (exception instanceof Error) {
      return this.handleError(exception, request);
    }

    // 处理未知异常
    return this.handleUnknownException(request);
  }

  private handleHttpException(exception: HttpException, request: Request) {
    const response = exception.getResponse();
    const status = exception.getStatus();

    // 场景一：项目中主动抛出的 HttpException 异常
    if (typeof response === 'string') {
      return {
        code: status,
        message: response,
      };
    }

    // 场景二：全局验证管道抛出的异常
    // @ts-expect-error 类型错误
    let message = response?.message;
    if (message && Array.isArray(message)) {
      message = message.join(',');
    }

    return {
      code: status,
      message: message || '服务器内部错误',
    };
  }

  private handleError(error: Error, request: Request) {
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }

  private handleUnknownException(request: Request) {
    return {
      code: HttpStatus.INTERNAL_SERVER_ERROR,
      message: '服务器异常，请稍后再试',
    };
  }

  private logError(request: Request, exception: unknown) {
    const errorStack =
      exception instanceof Error ? exception.stack : '未知错误';
    Logger.error(
      `请求地址：${request.url} 请求方法：${request.method}`,
      errorStack,
      'GlobalHttpExceptionFilter',
    );
  }
}
