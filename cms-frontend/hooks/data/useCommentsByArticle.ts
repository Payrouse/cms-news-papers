import useSWR from 'swr';
import { fetcher } from './fetcher';

function useCommentsByArticle(id: string) {
  const { data, error } = useSWR([`/comments/article/${id}`], fetcher);
  return {
    comments: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useCommentsByArticle;
