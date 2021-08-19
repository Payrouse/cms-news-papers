import { useSelector } from 'react-redux';

import { StoreType } from '../../../../redux/types';
import Toolbar from '../../../toolbar/AdminToolbar';
import UpdateAvatar from './UpdateAvatar';
import UpdatePassword from './UpdatePassword';
import UpdateUser from './UpdateUser';
import UserInfo from './UserInfo';

const Settings = ({ titleToolbar }: any) => {
  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );
  return (
    <>
      <Toolbar title={titleToolbar} />
      <div className="container-views custom-scroll">
        <div className="my-6 w-full bg-white rounded border-gray-200 shadow p-6">
          <div className="pb-2 flex items-center">
            <UpdateAvatar />
            <UserInfo sub={user.sub} />
          </div>
          <div className="border-t py-2">
            <UpdateUser />
          </div>
          <div className="border-t pt-2">
            <UpdatePassword />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
