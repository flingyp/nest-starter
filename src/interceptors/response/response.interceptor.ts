import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface GlobalResponse {
  statusCode: HttpStatus;
  data: unknown;
  message: string;
}

export class ResponseInstance<T> implements GlobalResponse {
  constructor(
    public statusCode: HttpStatus,
    public data: T,
    public message: string,
  ) {}
}

/**
 * global response interceptor
 */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value: unknown) => {
        // TODO: 默认提示消息
        if (value instanceof ResponseInstance) return value;
        return new ResponseInstance(200, value, '操作成功');
      }),
    );
  }
}
