import { useRouter } from 'next/router';

import LayoutAdmin from '../../components/layouts/AdminLayout';
import Settings from '../../components/views/admin/Settings';
import Users from '../../components/views/admin/Users';

const Admin = () => {
  const router = useRouter();
  const { aid } = router.query;
  console.log('route', aid);

  return (
    <LayoutAdmin route={aid}>
      <View route={aid} />
    </LayoutAdmin>
  );
};

const View = ({ route }: any) => {
  switch (route) {
    case undefined:
      return <div>loading...</div>;
    case 'settings':
      return <Settings titleToolbar="Configuraciones" />;
    case 'users':
      return <Users titleToolbar="Usuarios" />;
    default:
      return <div>404</div>;
  }
};

export default Admin;
