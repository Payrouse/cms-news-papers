import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';

import { StoreType } from '../../redux/types';
import { clearUser } from '../../redux/actions/userAction';

const AppToolbar = () => {
  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );

  return (
    <header className="bg-white border-b shadow flex justify-center">
      <div className="md:w-4/5 w-full px-2 py-2">
        <div className="flex justify-between">
          <Link href="/">
            <a>
              <h1 className="text-4xl font-bold text-blue-600">El Mundo</h1>
            </a>
          </Link>
          <div className="h-10 w-10">
            {loading ? (
              <div className="bg-gray-200 border h-10 w-10 rounded-full animate-pulse" />
            ) : isLogin ? (
              <ProfileMenu user={user} />
            ) : (
              <div
                onClick={() => {
                  Router.push('/login');
                }}
              >
                Iniciar sesión
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const ProfileMenu = ({ user }: any) => {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goTo = (url: string) => {
    handleClose();
    Router.push(url);
  };

  const logout = () => {
    handleClose();
    Cookies.remove('_mtn');
    dispatch(clearUser());
  };

  return (
    <>
      <button
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={user.avatar}
          alt="profile"
        />
      </button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            goTo('/user');
          }}
        >
          Perfil
        </MenuItem>
        <MenuItem
          onClick={() => {
            goTo('/admin');
          }}
        >
          Admin
        </MenuItem>
        <MenuItem
          onClick={() => {
            goTo('/complaint');
          }}
        >
          Denuncia ciudadana
        </MenuItem>
        <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default AppToolbar;
