import LayoutAdmin from '../../components/layouts/AdminLayout';
import Dashboard from '../../components/views/admin/Dashboard';

const Admin = (props: any) => {
  return (
    <LayoutAdmin route="/">
      <Dashboard titleToolbar="Inicio" />
    </LayoutAdmin>
  );
};

export default Admin;
