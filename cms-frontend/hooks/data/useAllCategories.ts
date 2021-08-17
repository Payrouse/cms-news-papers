import useSWR from 'swr';
import { fetcher } from './fetcher';

function useAllCategories() {
  const { data, error } = useSWR([`/categories`], fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useAllCategories;
