import { fetch, FetchRequestInit } from 'expo/fetch';

import { FetchResponse } from 'expo/build/winter/fetch/FetchResponse';

export async function client<T>(
  url: string,
  init?: FetchRequestInit
): Promise<FetchResponse & { data: T }> {
  const config = {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    }
  };

  const response = await fetch(
    `https://khmlfkl3-8080.brs.devtunnels.ms${url}`,
    config
  );

  const data: T = await response.json();

  return Object.assign({ data }, response);
}
