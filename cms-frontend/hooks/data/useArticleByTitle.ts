import useSWR from 'swr';
import { fetcher } from './fetcher';

function useUserArticle(id: string) {
  const { data, error } = useSWR([`/article/${id}`], fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUserArticle;
