import ListAllUsers from '@/modules/accounts/useCases/listAllUsers';
import UsersRepository from '@/modules/accounts/repositories/usersRepository';
import CreateUserUseCase from '@/modules/accounts/useCases/createUser';
import { createUserSchema } from '@/modules/accounts/schemas/create-user';

import { FastifyTypedInstance } from '@/types';
import AuthenticateUserUseCase from '@/modules/accounts/useCases/authenticateUser';
import { z } from 'zod';

export async function usersRoutes(app: FastifyTypedInstance) {
  app.post(
    '/',
    {
      schema: {
        description: 'create a new user',
        tags: ['users'],
        body: createUserSchema,
        response: {
          201: true
        }
      }
    },
    async (request, reply) => {
      const usersRepository = new UsersRepository(request.db);

      const createUserUseCase = new CreateUserUseCase(usersRepository);

      await createUserUseCase.execute(request.body);

      reply.status(201).send();
    }
  );

  app.get(
    '/',
    {
      schema: {
        description: 'get all users',
        tags: ['users']
      }
    },
    (request, reply) => {
      const usersRepository = new UsersRepository(request.db);

      const listAllUsers = new ListAllUsers(usersRepository);

      reply.send(listAllUsers).send(200);
    }
  );

  app.post(
    '/session',
    {
      schema: {
        description: 'authenticate an user',
        tags: ['users'],
        body: z.object({
          email: z.string(),
          password: z.string()
        })
      }
    },
    async (request, reply) => {
      const usersRepository = new UsersRepository(request.db);

      const authenticateUserUseCase = new AuthenticateUserUseCase(
        usersRepository
      );

      const user = await authenticateUserUseCase.execute(request.body);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      const token = request.jwt.sign(payload);

      reply.setCookie('access_token', token, {
        path: '/',
        httpOnly: true,
        secure: true
      });

      return { accessToken: token };
    }
  );
}
