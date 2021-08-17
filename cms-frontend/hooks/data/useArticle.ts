import useSWR from 'swr';
import { fetcher } from './fetcher';

function useArticle(id: string) {
  const { data, error } = useSWR([`/articles/${id}`], fetcher);
//   console.log('ERROR HOOK', error);
  const article = data ? (data.statusCode ? null : data) : null;
  const isErrorArticle = data?.statusCode ? true : false;
  return {
    article,
    isLoadingArticle: !error && !data,
    isErrorArticle,
  };
}

export default useArticle;
