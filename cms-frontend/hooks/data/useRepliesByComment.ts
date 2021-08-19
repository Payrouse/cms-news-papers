import useSWR from 'swr';
import { fetcher } from './fetcher';

function useRepliesByComment(id: string) {
  const { data, error } = useSWR([`/comments/${id}/replies`], fetcher);
  return {
    comments: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useRepliesByComment;
