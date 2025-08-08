import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;

  constructor(private configService: ConfigService) {
    const config = this.configService.get('redis');

    this.client = createClient({
      socket: {
        host: config.host,
        port: config.port,
      },
    });
    this.client.connect();

    this.client.on('connect', () => {
      Logger.verbose(
        `Redis 服务已连接: ${config.host}:${config.port}`,
        'RedisService',
      );
    });

    this.client.on('error', (err) => {
      Logger.error(
        `Redis 服务连接失败 - ${JSON.stringify(err)}`,
        'RedisService',
      );
    });
  }

  // 获取指定键的值
  async get(key: string) {
    return await this.client.get(key);
  }

  // 设置键值对，可选设置过期时间（秒）
  async set(key: string, value: string | number, ttl?: number) {
    await this.client.set(key, value);

    if (ttl) {
      await this.client.expire(key, ttl);
    }
  }

  // 删除指定键
  async del(key: string) {
    return await this.client.del(key);
  }

  // 获取哈希表中指定键的所有字段和值
  async hashGet(key: string) {
    return await this.client.hGetAll(key);
  }

  // 设置哈希表中指定键的字段和值，可选设置过期时间（秒）
  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.client.hSet(key, name, obj[name]);
    }

    if (ttl) {
      await this.client.expire(key, ttl);
    }
  }
}
