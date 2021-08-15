import Cookies from 'js-cookie';
import Router from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { endUserLoading, getMe } from '../redux/actions/userAction';
import { StoreType } from '../redux/types';
import LoadingAdmin from '../components/views/loading/LoadingAdmin';
import { Config } from '../config';

const Profile = () => {
  const dispatch = useDispatch();

  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );

  useEffect(() => {
    if (Cookies.get(Config.cookieName)) {
      dispatch(getMe());
    } else {
      dispatch(endUserLoading());
    }
  }, [dispatch]);

  if (loading) {
    return <LoadingAdmin />;
  } else if (!isLogin) {
    Router.replace('/login');
    return <LoadingAdmin message="Redirigiendo..." />;
  } else if (!user.isAdministrative) {
    Router.replace('/');
    return <LoadingAdmin />;
  } else {
    Router.replace('/admin');
    return <LoadingAdmin />;
  }
};

export default Profile;
