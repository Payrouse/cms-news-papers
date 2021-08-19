import React from 'react';
import useUser from '../../../../hooks/data/useUser';
import { ControllerDate } from '../../../../library/Time';

const UserInfo = ({ sub }: any) => {
  const { user, isError, isLoading } = useUser(sub);

  return (
    <div className="ml-4 flex items-center w-full">
      {isLoading ? (
        <UserInfoPlaceholder />
      ) : (
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-6/12 px-4">
            <p>
              <b>Te uniste el</b>{' '}
              {`${ControllerDate.parseOnlyDate(user.createdAt)}`}
            </p>
            <p>
              <b>Ultima actualización</b>{' '}
              {`${ControllerDate.timeAgo(user.updatedAt)}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const UserInfoPlaceholder = () => {
  return (
    <div className="flex items-center">
      <div className="w-full lg:w-6/12 px-4">
        <p className="animate-pulse bg-gray-200 py-2 px-10 rounded" />
        <p className="animate-pulse bg-gray-200 py-2 px-10 mt-1 rounded" />
      </div>
    </div>
  );
};

export default UserInfo;
