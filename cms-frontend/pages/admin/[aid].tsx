import { useRouter } from 'next/router';

import LayoutAdmin from '../../components/layouts/AdminLayout';
import Settings from '../../components/views/admin/Settings';

const Admin = (props: any) => {
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
    default:
      return <div>404</div>;
  }
};

export default Admin;
