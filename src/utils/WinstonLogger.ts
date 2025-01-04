import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as WinstonDailyRotateFile from 'winston-daily-rotate-file';

/**
 * Winston 日志服务
 */
@Injectable()
export class WinstonLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.json(), // 日志格式为 JSON
      transports: [
        new WinstonDailyRotateFile({
          dirname: 'logs', // 日志文件目录
          filename: 'application-%DATE%.log', // 日志文件名
          datePattern: 'YYYY-MM-DD', // 按日期轮转
          zippedArchive: true, // 压缩归档
          maxSize: '20m', // 最大文件大小
          maxFiles: '14d', // 最大文件数量,
          format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 添加时间戳
            winston.format.json(),
          ),
        }),
        new winston.transports.Console(), // 控制台输出
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, { trace });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
