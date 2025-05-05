import { z } from 'zod';

import { FastifyTypedInstance } from '@/types';

import ValidateDocuments from '@/modules/identity/useCases/validateDocuments';
import {
  validateDocumentsSchema,
  querystring,
  status,
  Status
} from '@/modules/identity/schemas/validate-documents';

export async function identity(app: FastifyTypedInstance) {
  app.post(
    '/validate',
    {
      schema: {
        description: 'validate a new user',
        tags: ['identity'],
        body: validateDocumentsSchema,
        response: {
          200: z.null().describe('user was validated'),
          422: z
            .object({ message: z.string() })
            .describe('user data was not valid')
        }
      }
    },
    async (request, reply) => {
      const validateDocuments = new ValidateDocuments();

      await validateDocuments.execute(request.body);

      return reply.status(200).send();
    }
  );

  app.get(
    '/status',
    {
      schema: {
        description: 'get validation state',
        tags: ['identity'],
        querystring,
        response: {
          200: z.object({
            status
          })
        }
      }
    },
    async (request, reply) => {
      const { cpf } = request.query;

      let status = await request.redis.get<Status>(`status:${cpf}`);

      if (!status) status = 'invalid';

      return reply.send({
        status
      });
    }
  );
}
