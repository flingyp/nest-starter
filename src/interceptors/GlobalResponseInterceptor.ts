import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface GlobalResponse {
  data: unknown;
  code: HttpStatus;
  message: string;
  success: boolean;
}

export class ResponseInstance<T> implements GlobalResponse {
  constructor(
    public data: T = null,
    public code: HttpStatus = HttpStatus.OK,
    public message: string = '操作成功',
    public success: boolean = true,
  ) {}
}

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.transformData(data)));
  }

  // 在这里对响应数据进行转换或添加额外信息
  transformData(data: unknown): any {
    if (data instanceof ResponseInstance) return data;
    return new ResponseInstance(data);
  }
}
