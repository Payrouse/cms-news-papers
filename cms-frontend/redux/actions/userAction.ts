import Cookies from 'js-cookie';
import * as types from '../types';

export const getMe = () => async (dispatch: any) => {
  const user = await fetch(`${process.env.NEXT_PUBLIC_HOST}/users/me`, {
    method: 'GET',
    headers: {
      access_token: Cookies.get('_mtn') || '',
      Auth: process.env.NEXT_PUBLIC_API_KEY || 'unauthenticated',
    },
  });

  let payload = {
    user: {},
    isLogin: false,
  };

  if (user.ok) {
    const data = await user.json();
    payload = {
      user: data.user,
      isLogin: true,
    };
  }

  dispatch({
    type: types.GET_ME,
    payload,
  });
};

export const setUser = (user: any) => async (dispatch: any) => {
  dispatch({
    type: types.SET_USER,
    payload: user,
  });
};

export const endUserLoading = () => async (dispatch: any) => {
  dispatch({
    type: types.END_USER_LOADING,
  });
};

export const clearUser = () => async (dispatch: any) => {
  dispatch({
    type: types.CLEAR_USER,
  });
};
