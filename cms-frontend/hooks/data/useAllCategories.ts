import useSWR from 'swr';
import { Category } from '../../models/category.model';
import { fetcher } from './fetcher';

interface HookAllCategories {
  categories: Category[];
  isLoading: boolean;
  isError: any;
}

function useAllCategories(): HookAllCategories {
  const { data, error } = useSWR([`/categories`], fetcher);
  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useAllCategories;
