import { app } from '@/app';
import { createUserSchema } from '@/modules/accounts/schemas/create-user';
import { strictEqual } from 'node:assert';

import { generateMock } from '@anatine/zod-mock';

import { after, describe, it } from 'node:test';

describe('[users]', () => {
  after(async () => {
    process.exit(0);
  });

  it('POST /', async () => {
    const mockData = generateMock(createUserSchema, {
      stringMap: {
        cep: () => '81930-080',
        cpf: () => '677.554.420-04'
      }
    });

    const response = await app.inject({
      url: '/api/v1/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...mockData, spentMoney: 1000, number: 21 })
    });

    strictEqual(response.statusCode, 201);
  });
});
