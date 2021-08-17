import Router from 'next/router';
import { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { StoreType } from '../../redux/types';
import styles from './Toolbar.module.css';
import Slidebar from '../nav/SlideBar';
import { Config } from '../../config';
import Cookies from 'js-cookie';
import { clearUser } from '../../redux/actions/userAction';

interface ToolbarProps {
  title: string;
}

const Toolbar = ({ title }: ToolbarProps) => {
  const { loading, user } = useSelector((state: StoreType) => state.user);

  return (
    <header className={styles.toolbar}>
      <div className="flex items-center relative">
        <div className={styles.burger_menu}>
          <Slidebar />
        </div>
        <p className={styles.toolbar_title}>{title}</p>
      </div>
      <div className="flex items-center">
        <AdminMenu user={user} loading={loading} />
      </div>
    </header>
  );
};

const AdminMenu = ({ user, loading }: any) => {
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
        aria-controls="admin-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          className={`${
            loading ? 'animate-pulse' : ''
          } h-10 w-10 rounded-full object-cover`}
          src={user && user.avatar}
          alt="profile"
        />
      </button>
      <Menu
        id="admin-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            goTo('/admin');
          }}
        >
          Admin
        </MenuItem>
        <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default Toolbar;
