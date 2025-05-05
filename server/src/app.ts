import fastify, { FastifyReply, FastifyRequest } from 'fastify';

import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import mulpart from '@fastify/multipart';
import jwt, { FastifyJWT } from '@fastify/jwt';

import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import log from '@/utils/log';

import { usersRoutes } from '@/routes/users.routes';
import { identity } from '@/routes/identity.routes';

import { dbInstanceMiddleware } from '@/middlewares/dbinstance';
import { env } from './utils/env';

const API_VERSION = '/api/v1';

export const app = fastify({
  bodyLimit: 1_000_000,
  trustProxy: true,
  logger: false
  // loggerInstance: log
});

app.withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(cors, {
  origin: '*'
});
app.register(cookie);
app.register(mulpart, {
  limits: {
    fileSize: 10000000,
    fieldSize: 10000000
  },
  attachFieldsToBody: 'keyValues'
});
app.register(jwt, { secret: env.JWT_SECRET });
app.decorate(
  'authenticate',
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;

    if (!token)
      return reply.status(401).send({ message: 'Authentication required' });

    const decoded = req.jwt.verify<FastifyJWT['user']>(token);

    req.user = decoded;
  }
);
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'FuriaHub API',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
});

app.register(dbInstanceMiddleware);

app.addHook('preHandler', (req, _, next) => {
  req.jwt = app.jwt;
  return next();
});

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
});

app.register(identity, {
  prefix: `${API_VERSION}/identity`
});

app.register(usersRoutes, {
  prefix: `${API_VERSION}/users`
});
