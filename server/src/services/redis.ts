import * as redis from 'redis';

import { env } from '@/utils/env';
import log from '@/utils/log';

type RedisPrefixes = 'status';
export type RedisKey = `${RedisPrefixes}:${string | number}` | RedisPrefixes;

type SetOptions = Parameters<redis.RedisClientType['set']>[2];
type RedisArgument = Parameters<redis.RedisClientType['set']>[1];

class Redis {
  public static redis: redis.RedisClientType;

  public static async initialize() {
    this.redis = redis.createClient({
      url: env.REDIS_URL
    });

    this.redis.on('error', (error: unknown) => {
      log.error('INIT', 'Failed to connect to redis ' + String(error));
      throw new Error('Failed to connect to redis');
    });

    this.redis.on('connect', () => {
      log.info('INIT', 'Connected to redis');
    });

    await this.redis.connect();
  }

  public static async set(
    key: RedisKey,
    value: number | RedisArgument,
    options?: SetOptions
  ) {
    await this.redis.set(key, value, options);
  }

  public static async incr(key: RedisKey) {
    await this.redis.incr(key);
  }

  public static async decr(key: RedisKey) {
    await this.redis.decr(key);
  }

  public static async get<T = string>(key: RedisKey) {
    return this.redis.get(key) as T | undefined;
  }

  public static async del(key: RedisKey) {
    await this.redis.del(key);
  }
}

export { Redis, type RedisPrefixes };
