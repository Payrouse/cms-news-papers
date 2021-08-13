import Cookies from 'js-cookie';
import Router from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StoreType } from '../../redux/types';
import { endUserLoading, getMe } from '../../redux/actions/userAction';
import LayoutAdmin from '../../components/layouts/AdminLayout';
import Dashboard from '../../components/views/admin/Dashboard';
import LoadingAdmin from '../../components/views/loading/LoadingAdmin';

const Admin = () => {
  const dispatch = useDispatch();

  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );

  useEffect(() => {
    if (Cookies.get('_mtn')) {
      dispatch(getMe());
    } else {
      dispatch(endUserLoading());
    }
  }, []);

  if (loading) {
    return <LoadingAdmin />;
  } else if (!isLogin) {
    Router.replace('/login');
    return <div>redirect...</div>;
  } else if (!user.isAdministrative) {
    Router.replace('/');
    return <LoadingAdmin />;
  } else {
    return (
      <LayoutAdmin route="/">
        <Dashboard titleToolbar="Inicio" />
      </LayoutAdmin>
    );
  }
};

export default Admin;
