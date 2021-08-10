import Toolbar from '../../toolbar/AdminToolbar';
import UsersDashBoard from '../../users/UsersDashBoard';

const Users = ({ titleToolbar }: any) => {
  return (
    <>
      <Toolbar title={titleToolbar} />
      <UsersDashBoard/>
    </>
  );
};

export default Users;