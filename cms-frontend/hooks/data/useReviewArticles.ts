import useSWR from 'swr';

import { fetcher } from './fetcher';
import { Article } from './../../models/article.model';

interface HookReviewArticles {
  articles: Article[];
  isLoading: boolean;
  isError: any;
}

function useReviewArticles(): HookReviewArticles {
  const { data, error } = useSWR([`/articles/reviews`], fetcher);
  return {
    articles: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useReviewArticles;
