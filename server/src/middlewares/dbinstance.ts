import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import { db } from '@/database';
import { Redis } from '@/services/redis';

const dbInstanceMiddleware = fp(async (fastify: FastifyInstance) => {
  fastify.addHook('onRequest', async (request) => {
    request.redis = Redis;
    request.db = db;
  });
});

export { dbInstanceMiddleware };
