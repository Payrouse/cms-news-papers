export const fetcher = async (url: string) => {
  const r = fetch(`${process.env.NEXT_PUBLIC_HOST}${url}`, {
    method: 'GET',
    headers: {
      Auth: process.env.NEXT_PUBLIC_API_KEY || 'unauthenticated',
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());
  return r;
};
