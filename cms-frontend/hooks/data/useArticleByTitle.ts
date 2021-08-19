import useSWR from 'swr';
import { fetcher } from './fetcher';

function useArticleByTitle(id: string) {
  const { data, error } = useSWR([`/articles/title/${id}`], fetcher);
  return {
    article: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useArticleByTitle;
