import useSWR from 'swr';
import { fetcher } from './fetcher';

function useUser(uid: string) {
  const { data, error } = useSWR([`/user/${uid}`], fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUser;
