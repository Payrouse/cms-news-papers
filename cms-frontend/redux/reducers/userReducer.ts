import * as types from '../types';

export interface UserStoreType {
  user: any;
  isLogin: boolean;
  loading: boolean;
}

const initialState: UserStoreType = {
  user: {},
  isLogin: false,
  loading: true,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_ME:
      return {
        ...state,
        user: action.payload.user,
        isLogin: action.payload.isLogin,
        loading: false,
      };
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        loading: false,
      };
    case types.END_USER_LOADING:
      return {
        ...state,
        isLogin: false,
        loading: false,
      };
    case types.CLEAR_USER:
      return {
        ...state,
        user: {},
        isLogin: false,
        loading: false,
      };

    default:
      return { ...state };
  }
};
