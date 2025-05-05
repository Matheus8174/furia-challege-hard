import type { db } from '@/database';
import type { Redis } from '@/services/redis';
import type { JWT } from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
    db: typeof db;
    redis: typeof Redis;
  }

  export interface FastifyInstance {
    authenticate: unknown;
  }
}

type UserPayload = {
  id: string;
  email: string;
  name: string;
};

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload;
  }
}
