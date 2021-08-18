import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';

import { StoreType } from '../../redux/types';
import { clearUser } from '../../redux/actions/userAction';
import { Config } from '../../config';
import { UserAccount } from '../../redux/reducers/userReducer';

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
              <h1 className="text-4xl font-bold text-blue-600">El Planeta</h1>
            </a>
          </Link>
          <div className="h-10 w-10">
            {loading ? (
              <div className="bg-gray-200 border h-10 w-10 rounded-full animate-pulse" />
            ) : isLogin ? (
              <ProfileMenu user={user} />
            ) : (
              <NotUserMenu />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

interface ProfileMenuProps {
  user: UserAccount;
}

const ProfileMenu = ({ user }: ProfileMenuProps) => {
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
    Cookies.remove(Config.cookieName);
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
        {user.isAdministrative ? (
          <MenuItem
            onClick={() => {
              goTo('/admin');
            }}
          >
            Admin
          </MenuItem>
        ) : null}
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

const NotUserMenu = () => {
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

  return (
    <>
      <button
        aria-controls="not-user-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={'/img/user.svg'}
          alt="profile"
        />
      </button>
      <Menu
        id="not-user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            goTo('/login');
          }}
        >
          Iniciar sesión
        </MenuItem>
        <MenuItem
          onClick={() => {
            goTo('/register');
          }}
        >
          Registrarse
        </MenuItem>
      </Menu>
    </>
  );
};

export default AppToolbar;
