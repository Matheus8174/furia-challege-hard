import path from 'node:path';

import { it, describe } from 'node:test';

import { strictEqual } from 'node:assert';

import formAutoContent from 'form-auto-content';

import sharp from 'sharp';

import { app } from '@/app';

const resolveFile = (fileName: string) =>
  sharp(path.join(import.meta.dirname, 'assets', fileName))
    .resize({
      height: 400
    })

describe('[identity]', () => {
  it('POST /validate', async () => {
    const selfie = resolveFile('person.png');

    const rgfront = resolveFile('document-front.png');

    const rgback = resolveFile('document-back.png');

    const form = formAutoContent({
      data: JSON.stringify({
        name: 'Joe Doe',
        cpf: '123.456.789-09'
      }),
      selfie,
      documents: [rgfront, rgback]
    });

    const response = await app.inject({
      url: 'api/v1/identity/validate',
      method: 'POST',
      ...form
    });

    console.log(response)

    strictEqual(response.statusCode, 200);
  });

  it.skip('GET /status', async () => {
    await app.inject({
      url: 'api/v1/identity/status',
      method: 'GET'
    });
  });
});
