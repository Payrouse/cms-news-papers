export class Http {
  instance = new Http();
  post(url: string) {}
}

export const FetchApi = async ({
  url,
  method = 'GET',
  headers = {
    'Content-type': 'application/json',
  },
  body = null,
}: FetchApiParams) => {
  let payload: any = {
    method,
    headers: {
      ...headers,
      Auth: process.env.NEXT_PUBLIC_API_KEY || 'unauthenticated',
      'Content-type': 'application/json',
    },
  };

  if (body) payload.body = body;

  console.log('payload', payload);

  return await fetch(`${process.env.NEXT_PUBLIC_HOST}/${url}`, payload);
};

interface FetchApiParams {
  url: string;
  method?: string;
  headers?: any;
  body?: any;
}
