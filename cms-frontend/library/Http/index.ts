import Cookies from 'js-cookie';

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
}: FetchApiParams): Promise<FetchApiResponse> => {
  let payload: any = {
    method,
    headers: {
      ...headers,
      Auth: process.env.NEXT_PUBLIC_API_KEY || 'unauthenticated',
      access_token: Cookies.get('_mnt'),
      'Content-type': 'application/json',
    },
  };

  if (body) payload.body = JSON.stringify(body);

  console.log('payload', payload);

  const _r = fetch(`${process.env.NEXT_PUBLIC_HOST}${url}`, payload)
    .then(async (r) => {
      const data = await r.json();
      if (r.ok) {
        return { ok: r.ok, statusCode: r.status, data };
      } else {
        return { ok: r.ok, error: data };
      }
    })
    .catch((e) => e);
  // console.log(_r);
  return _r;
};

interface FetchApiParams {
  url: string;
  method?: string;
  headers?: any;
  body?: any;
}

interface FetchApiResponse {
  ok: boolean;
  statusCode: number;
  data: any;
  error: {
    statusCode: number;
    message: string;
  };
}
