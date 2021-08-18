import useSWR from 'swr';
import { Article } from '../../models/article.model';
import { fetcher } from './fetcher';

interface HookLastNews {
  articles: Article[];
  isLoading: boolean;
  isError: any;
}

function useLastNews(): HookLastNews {
  const { data, error } = useSWR([`/articles/last-news`], fetcher);
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useLastNews;
