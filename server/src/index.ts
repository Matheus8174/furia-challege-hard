import { env } from '@/utils/env';

import { app } from '@/app';
import { initDb } from '@/database';
import { Redis } from '@/services/redis';

const listeners = ['SIGINT', 'SIGTERM'];

async function boot() {
  await Promise.all([initDb(), Redis.initialize()]);

  await app.ready();

  listeners.forEach((signal) => {
    process.on(signal, async () => {
      await app.close();
      process.exit(0);
    });
  });

  const url = await app.listen({ host: '0.0.0.0', port: env.PORT });

  console.log('HTTP Server Running at', url);
}

boot();
