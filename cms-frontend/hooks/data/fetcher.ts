import Cookies from 'js-cookie';
import { Config } from './../../config';

export const fetcher = async (url: string) => {
  const r = await fetch(`${process.env.NEXT_PUBLIC_HOST}${url}`, {
    method: 'GET',
    headers: {
      Auth: process.env.NEXT_PUBLIC_API_KEY || 'unauthenticated',
      access_token: Cookies.get(Config.cookieName) || '',
      'Content-type': 'application/json',
    },
  });

  // Si el status code no esta en el rango 200-299,
  // seguimos intentando analizarlo y lanzarlo.
  if (!r.ok) {
    const error: any = new Error('An error occurred while fetching the data.');
    // Adjunta información extra al objeto de error.
    error.info = await r.json();
    error.status = r.status;
    throw error;
  }
  return r.json();
};
