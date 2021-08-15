import { UserStoreType } from './reducers/userReducer';

// auth states
export const GET_ME = 'GET_ME';
export const SET_USER = 'SET_USER';
export const END_USER_LOADING = 'END_USER_LOADING';
export const CLEAR_USER = 'CLEAR_USER';

// interface store
export interface StoreType {
  user: UserStoreType;
}
