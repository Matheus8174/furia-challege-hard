import { Pool, PoolClient } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

import * as schema from '@/database/schema';

import log from '@/utils/log';
import { env } from '@/utils/env';

export type DbClient = ReturnType<typeof drizzle<typeof schema, PoolClient>>;

export let db: DbClient;

export const initDb = async () => {
  const pool = await new Pool({
    connectionString: env.DATABASE_URL
  })
    .connect()
    .then((client) => {
      log.info('INIT', 'Connected to database');

      return client;
    })
    .catch((error) => {
      log.error('INIT', `Failed to connect to database ${String(error)}}`);
      throw new Error(`Failed to connect to database ${String(error)}`);
    });

  db = drizzle(pool, {
    schema
  });

  await migrate(db, {
    migrationsFolder: './src/database/migrations'
  })
    .then(() => {
      log.info('INIT', 'Migrated database');
    })
    .catch((error) => {
      log.error('INIT', `Failed to migrate database ${String(error)}`);
      throw new Error(`Failed to migrate database ${String(error)}`);
    });
};
