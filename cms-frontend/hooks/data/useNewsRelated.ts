import useSWR from 'swr';
import { fetcher } from './fetcher';

function useNewsRelated(id: string) {
  const { data, error } = useSWR([`/articles/related/${id}`], fetcher);
  return {
    news: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useNewsRelated;
