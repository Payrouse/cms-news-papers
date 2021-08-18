import useSWR from 'swr';
import { fetcher } from './fetcher';

function useCategory(id: string) {
  const { data, error } = useSWR([`/category/${id}`], fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useCategory;
