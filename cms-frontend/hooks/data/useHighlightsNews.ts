import useSWR from 'swr';
import { Article } from '../../models/article.model';
import { fetcher } from './fetcher';

interface HookHighlightsNews {
  articles: Article[];
  isLoading: boolean;
  isError: any;
}

function useHighlightsNews(): HookHighlightsNews {
  const { data, error } = useSWR([`/articles/highlighted`], fetcher);
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useHighlightsNews;
