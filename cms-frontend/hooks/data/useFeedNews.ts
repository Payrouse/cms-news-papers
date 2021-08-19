import useSWR from 'swr';
import { Article } from '../../models/article.model';
import { fetcher } from './fetcher';

interface HookFeedNews {
  articles: Article[];
  isLoading: boolean;
  isError: any;
}

function useFeedNews(): HookFeedNews {
  const { data, error } = useSWR([`/articles/feed`], fetcher);
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useFeedNews;
