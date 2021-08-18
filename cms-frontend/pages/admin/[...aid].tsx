import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { StoreType } from '../../redux/types';
import { endUserLoading, getMe } from '../../redux/actions/userAction';
import LayoutAdmin from '../../components/layouts/AdminLayout';
import Editor from '../../components/views/admin/editor';
import Publish from '../../components/views/admin/publish';
import Settings from '../../components/views/admin/settings';
import Users from '../../components/views/admin/Users';
import LoadingAdmin from '../../components/views/loading/LoadingAdmin';
import { Config } from '../../config';

const Admin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { aid } = router.query;

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
    router.replace('/login');
    return <LoadingAdmin message="Redirigiendo..." />;
  } else if (!user.isAdministrative) {
    router.replace('/');
    return <LoadingAdmin />;
  } else {
    return (
      <LayoutAdmin route={aid}>
        <View route={aid} />
      </LayoutAdmin>
    );
  }
};

const View = ({ route }: any) => {
  let parsedRoute = undefined;
  let childRoute = undefined;
  if (route) {
    parsedRoute = route[0];
    childRoute = route.join('/');
  }

  switch (parsedRoute) {
    case undefined:
      return <div>loading...</div>;
    case 'settings':
      return <Settings titleToolbar="Configuraciones" />;
    case 'editor':
      return <Editor childRoute={childRoute} />;
    case 'publish':
      return <Publish childRoute={childRoute} />;
    case 'users':
      return <Users titleToolbar="Usuarios" />;
    default:
      return <div>404</div>;
  }
};

export default Admin;
