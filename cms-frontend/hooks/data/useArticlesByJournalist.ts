import useSWR from 'swr';
import { fetcher } from './fetcher';

function useArticlesByJournalist() {
  const { data, error } = useSWR([`/articles/journalist`], fetcher);
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useArticlesByJournalist;
