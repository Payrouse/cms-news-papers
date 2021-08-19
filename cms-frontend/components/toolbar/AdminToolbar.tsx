import Router from 'next/router';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import { StoreType } from '../../redux/types';
import { clearUser } from '../../redux/actions/userAction';
import Slidebar from '../nav/SlideBar';
import styles from './Toolbar.module.css';
import { Config } from '../../config';

interface ToolbarProps {
  title: string;
}

const Toolbar = ({ title }: ToolbarProps) => {
  const { loading, user } = useSelector((state: StoreType) => state.user);

  return (
    <div className="relative">
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
    </div>
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
        <div className="rounded-full bg-gray-400 bg-opacity-10 hover:bg-gray-500 hover:bg-opacity-10 p-1">
          <ArrowDropDownRoundedIcon fontSize="large" />
        </div>
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
          Inicio
        </MenuItem>
        <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default Toolbar;
