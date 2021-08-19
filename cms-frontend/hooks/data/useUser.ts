import useSWR from 'swr';
import { User } from '../../models/user.model';
import { fetcher } from './fetcher';

interface HookUser {
  user: User;
  isLoading: boolean;
  isError: any;
}

function useUser(uid: string): HookUser {
  const { data, error } = useSWR([`/users/${uid}`], fetcher);
  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default useUser;
