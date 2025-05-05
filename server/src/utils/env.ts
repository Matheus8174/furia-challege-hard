import { z } from 'zod';

import 'dotenv/config';

const envfile = '.env';

const envSchema = z.object({
  JWT_SECRET: z
    .string()
    .default(
      '1a7089fd49c6b420f471a98798e04a98b5392af839d90cce41a078e420797d05'
    ),
  EXPIRES_IN: z.string().default('2d'),
  DATABASE_URL: z
    .string()
    .default('postgres://myuser:mypassword@127.0.0.1:5432/mydatabase'),
  REDIS_URL: z.string().default('redis://127.0.0.1:6379/'),
  PORT: z.coerce.number().default(8080),
  HOST: z.string().default('127.0.0.1')
});

export const parsed = envSchema.safeParse(process.env);

if (parsed.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors,

    `\n❌ Missing variables in ${envfile} file, Make sure all required variables are defined in the .env file.`
  );
  throw new Error(
    'Invalid environment variables, Check terminal for more details '
  );
}

export const env = parsed.data;
