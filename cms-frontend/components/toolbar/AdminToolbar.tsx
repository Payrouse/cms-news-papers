import Router from 'next/router';
import { useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';

import styles from './Toolbar.module.css';
import Slidebar from '../nav/SlideBar';

interface ToolbarProps {
  title: string;
}

const Toolbar = ({ title }: ToolbarProps) => {
  return (
    <header className={styles.toolbar}>
      <div className="flex items-center relative">
        <div className={styles.burger_menu}>
          <Slidebar />
        </div>
        <p className={styles.toolbar_title}>{title}</p>
      </div>
      <div className="flex items-center">
        <AdminMenu />
      </div>
    </header>
  );
};

const AdminMenu = () => {
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
        aria-controls="admin-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={
            'https://imagenes.milenio.com/YONeZ5-2cQu0TH_W2iPiQ_FkzbM=/958x596/https://www.milenio.com/uploads/media/2018/12/25/quieran-comprar-cachorro-acudir-criaderos.jpg'
          }
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
        <MenuItem
          onClick={() => {
            goTo('/');
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
};

export default Toolbar;
