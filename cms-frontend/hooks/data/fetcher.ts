import Cookies from 'js-cookie';
import { Config } from './../../config';

export const fetcher = async (url: string) => {
  const r = fetch(`${process.env.NEXT_PUBLIC_HOST}${url}`, {
    method: 'GET',
    headers: {
      Auth: process.env.NEXT_PUBLIC_API_KEY || 'unauthenticated',
      access_token: Cookies.get(Config.cookieName) || '',
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
  return r;
};
