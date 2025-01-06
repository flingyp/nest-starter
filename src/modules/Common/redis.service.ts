import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  // 获取指定键的值
  async get(key: string) {
    return await this.redisClient.get(key);
  }

  // 设置键值对，可选设置过期时间（秒）
  async set(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value);

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  // 删除指定键
  async del(key: string) {
    return await this.redisClient.del(key);
  }

  // 获取哈希表中指定键的所有字段和值
  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  // 设置哈希表中指定键的字段和值，可选设置过期时间（秒）
  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (let name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
