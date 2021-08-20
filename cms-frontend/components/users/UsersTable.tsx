import { Avatar, Button, MenuItem, Modal, Select } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import Cookies from 'js-cookie';
import router from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Config } from '../../config';
import { FetchApi } from '../../library/Http';
import { ROLE_OPTIONS, UserRole, userStatus } from '../../models/user.model';
import { getMe, endUserLoading } from '../../redux/actions/userAction';
import { StoreType } from '../../redux/types';
import { Color } from '../../utils/assets/Color';
import User from './users.types';

function UsersTable(users: User[]) {
  //Handle Modal Open and Close
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: StoreType) => state.user);
  const { enqueueSnackbar } = useSnackbar();

    //check cheat
  function checkLogin() {
    if (!isLogin) {
      router.push('/login');
    }
  }

  useEffect(() => {
    if (Cookies.get(Config.cookieName)) {
      dispatch(getMe());
    } else {
      dispatch(endUserLoading());
    }
  }, [dispatch]);

  const handleOpen = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUser(null);
    setOpen(false);
  };

  //Handle Roles
  const [role, setRole] = useState<number | null>(null);
  const [openSelect, setOpenSelect] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as number);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  async function addRoleToUser(userId:String) {
    checkLogin();
  }

  function renderEditModal(user: User) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        className="flex items-stretch md:items-center md:justify-center"
      >
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="flex flex-col px-10 py-8 divide-y divide-gray-200">
            <div className="flex items-stretch w-full md:items-center md:justify-center">
              <Avatar src={user.photoUrl}>
                {`${user.name[0] + user.lastName[0]}`}
              </Avatar>
              <div className="pl-20">
                <h1 className="text-black-800">
                  {user.name + ' ' + user.lastName}
                </h1>
                <h2 className="text-gray-500">{'@' + user.userName}</h2>
                <h5>{user.email}</h5>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="flex flex-col divide-y divide-gray-200">Roles:</h3>
              {user.role.map((rol) => {
                if (rol !== 4 && rol !== 1) {
                  return (
                    <div
                      className="flex w-full items-stretch md:items-center md:justify-between"
                      key={rol}
                    >
                      <h3>{UserRole[rol]}</h3>
                      <Button
                        style={{ backgroundColor: '#c50e29', borderRadius: 5 }}
                      >
                        <span className="text-white">{`Quitar`}</span>
                      </Button>
                    </div>
                  );
                }
              })}
              <div className="flex w-full py-4 items-stretch md:items-center md:justify-between">
                <Select
                  open={openSelect}
                  onClose={handleCloseSelect}
                  onOpen={handleOpenSelect}
                  onChange={handleChange}
                >
                  {ROLE_OPTIONS.map((n) => {
                    if (!user.role.includes(n)) {
                      return <MenuItem value={n}>{UserRole[n]}</MenuItem>;
                    }
                  })}
                </Select>

                <Button style={{ backgroundColor: '#00b686', borderRadius: 5 }}>
                  <span className="text-white">{`Añadir`}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }

  function renderUsersTable() {
    return (
      <div className="flex flex-col">
        <div>
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="flex w-full flex w-full items-stretch md:items-center justify-items-start md:justify-items-center">
                    <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      USUARIO
                    </th>

                    <th className="w-1/5 px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      NOMBRE
                    </th>

                    <th className="w-1/5 px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ROLES
                    </th>

                    <th className="px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ESTADO
                    </th>
                    <th className="pl-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      FECHA DE CREACIÓN
                    </th>
                  </tr>
                </thead>
                <tbody
                  className="flex flex-col bg-white w-full divide-y divide-gray-200 overflow-y-scroll"
                  style={{ height: '50vh' }}
                >
                  {users.map((user) => renderUser(user))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {selectedUser ? renderEditModal(selectedUser) : <></>}
      </div>
    );
  }

  function renderUser(user: User) {
    return (
      <tr className="flex w-full items-stretch md:items-center justify-items-start md:justify-items-center mb-4 w-full">
        <td className="w-1/3 px-6 py-4">
          <div className="flex items-center">
            <Avatar src={user.photoUrl}>
              {`${user.name[0] + user.lastName[0]}`}
            </Avatar>
            {console.log(
              `${user.name[0].toUpperCase() + user.lastName[0].toUpperCase()}`,
            )}
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {user.userName}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="w-1/4 px-6 py-4">
          <div className="text-sm text-gray-900">{`${user.name} ${user.lastName}`}</div>
        </td>
        <td className="w-1/4 px-6 py-4 text-sm text-gray-500">
          {user.role.map((rol) => UserRole[rol] + ' ')}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            {userStatus[user.status]}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {user.createdAt.split(' ')[0]}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="hover:underline">
            <CreateIcon
              className="text-indigo-600 hover:text-indigo-900"
              viewBox="0 0 30 30"
            />
            <a
              className="text-indigo-600 hover:text-indigo-900"
              onClick={() => {
                handleOpen(user);
              }}
            >
              Edit
            </a>
          </div>
        </td>
      </tr>
    );
  }

  return renderUsersTable();
}

export default UsersTable;
