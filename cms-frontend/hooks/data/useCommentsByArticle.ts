import useSWR from 'swr';
import { fetcher } from './fetcher';

function useCommentsByArticle(id: string) {
  console.log("Aca idArticle del hook ", id)
  const { data, error } = useSWR([`/comments/article/${id}`], fetcher);
  return {
    comments: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useCommentsByArticle;
