import { useRouter } from 'next/router';

import LayoutAdmin from '../../components/layouts/AdminLayout';
import Editor from '../../components/views/admin/editor';
import EditArticle from '../../components/views/admin/editor/EditArticle';
import NewArticle from '../../components/views/admin/editor/NewArticle';
import Publish from '../../components/views/admin/publish';
import ReviewArticle from '../../components/views/admin/publish/ReviewArticle';
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
  let parsedRoute = undefined;
  if (route) {
    parsedRoute = route.join('/');
  }

  switch (parsedRoute) {
    case undefined:
      return <div>loading...</div>;
    case 'settings':
      return <Settings titleToolbar="Configuraciones" />;
    case 'editor':
      return <Editor titleToolbar="Redacción" />;
    case 'editor/new':
      return <NewArticle titleToolbar="Nuevo articulo" />;
    case 'editor/1':
      return <EditArticle titleToolbar="Editar articulo" />;
    case 'publish':
      return <Publish titleToolbar="Revisión" />;
    case 'publish/1':
      return <ReviewArticle titleToolbar="Revisar articulo" />;
    case 'users':
      return <Users titleToolbar="Usuarios" />;
    default:
      return <div>404</div>;
  }
};

export default Admin;
