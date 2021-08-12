import { useRouter } from 'next/router';

import LayoutAdmin from '../../components/layouts/AdminLayout';
import Editor from '../../components/views/admin/editor';
import Publish from '../../components/views/admin/publish';
import Settings from '../../components/views/admin/Settings';
import Users from '../../components/views/admin/Users';

const Admin = () => {
  const router = useRouter();
  const { aid } = router.query;

  return (
    <LayoutAdmin route={aid}>
      <View route={aid} />
    </LayoutAdmin>
  );
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
