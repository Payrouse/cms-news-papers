import { Menu, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const AppToolbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLogin(true);
    }, 5000);
  }, []);

  return (
    <header className="bg-white border-b shadow flex justify-center">
      <div className="md:w-4/5 w-full px-2 py-2">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-blue-600">El Mundo</h1>
          <div className="h-10 w-10">
            {!isLogin ? (
              <div className="bg-gray-200 border h-10 w-10 rounded-full animate-pulse" />
            ) : (
              <ProfileMenu />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          src={'https://imagenes.milenio.com/YONeZ5-2cQu0TH_W2iPiQ_FkzbM=/958x596/https://www.milenio.com/uploads/media/2018/12/25/quieran-comprar-cachorro-acudir-criaderos.jpg'}
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
        <MenuItem onClick={handleClose}>Perfil</MenuItem>
        <MenuItem onClick={handleClose}>Denuncia ciudadana</MenuItem>
        <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default AppToolbar;
