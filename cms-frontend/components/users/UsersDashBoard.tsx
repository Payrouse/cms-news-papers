import { Button, Modal, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import User from './users.types';
import UsersTable from './UsersTable';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { FetchApi } from '../../library/Http';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../redux/types';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { Config } from '../../config';
import { endUserLoading, getMe } from '../../redux/actions/userAction';
import router, { Router } from 'next/router';

function UsersDashBoard() {
  const [users, setUsers] = useState<User[]>([]);

  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: StoreType) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (Cookies.get(Config.cookieName)) {
      dispatch(getMe());
    } else {
      dispatch(endUserLoading());
    }
    getUsers();
  }, [dispatch]);

  //Inputs
  const [userNameInput, setUserNameInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [lnameInput, setlNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  //Create New User
  const newUser = (event: any) => {
    event.preventDefault();
    createNew();
    handleClose();
  };

  //Handle Modal Open and Close
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    checkLogin();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    getUsers();
  };
  //check cheat
  function checkLogin() {
    if (!isLogin) {
      router.push('/login');
    }
  }

  //get usersinfo
  async function getUsers() {
    checkLogin();
    const res = await FetchApi({
      url: '/users',
      method: 'GET',
    });

    if (!res.ok) {
      return enqueueSnackbar(res.error.message, {
        variant: 'error',
      });
    }

    setUsers(res.data);
  }

  // create new user request
  async function createNew() {
    checkLogin();

    const res = await FetchApi({
      url: '/auth/register',
      method: 'POST',
      body: {
        userName: userNameInput,
        firstName: nameInput,
        lastName: lnameInput,
        email: emailInput,
        password: passwordInput,
      },
    });

    if (!res.ok) {
      return enqueueSnackbar(res.error.message, {
        variant: 'error',
      });
    }

    enqueueSnackbar('Usuario Creado Exitosamente', {
      variant: 'success',
    });
  }

  return (
    <div className="container-views custom-scroll w-full">
      <div className="flex flex-col h-full w-full bg-red">
  
        {/* cabeza*/}
  
        <div className="flex my-4 content-center items-stretch md:items-center md:justify-evenly">
          <div className="flex content-center items-stretch md:items-center md:justify-center">
            <TextField
              id="outlined-basic"
              label="Nombre o Email"
              variant="outlined"
              size="small"
            />
            <SearchIcon
              viewBox="0 0 20 20"
              className="text-indigo-600 hover:text-indigo-900 mx-2"
            />
          </div>
          <Button
            style={{ backgroundColor: '#3399cc', borderRadius: 5 }}
            className="flex items-stretch md:items-center md:justify-center"
            onClick={handleOpen}
          >
            <PersonAddIcon viewBox="0 0 24 24" className="text-white mx-2" />
            <span className="text-white">{`Añadir Nuevo`}</span>
          </Button>
        </div>

        {/* Modal*/}

        <Modal
          open={open}
          onClose={handleClose}
          className="flex items-stretch md:items-center md:justify-center"
        >
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="flex flex-col space-y-4 items-stretch md:items-center md:justify-evenly bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <TextField
                id="username-input"
                label="Nombre de Usuario"
                variant="outlined"
                size="small"
                className="w-full"
                onChange={(e) => {
                  setUserNameInput(e.target.value);
                }}
              />
              <TextField
                id="name-input"
                label="Nombre"
                variant="outlined"
                size="small"
                className="w-full"
                onChange={(e) => {
                  setNameInput(e.target.value);
                }}
              />

              <TextField
                id="last_name-input"
                label="Apellido"
                variant="outlined"
                size="small"
                className="w-full"
                onChange={(e) => {
                  setlNameInput(e.target.value);
                }}
              />

              <TextField
                id="email-input"
                label="Correo Electrónico"
                variant="outlined"
                size="small"
                className="w-full"
                onChange={(e) => {
                  setEmailInput(e.target.value);
                }}
              />

              <TextField
                id="password-input"
                label="Contraseña"
                variant="outlined"
                size="small"
                type="password"
                className="w-full"
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                }}
              />
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={newUser}
              >
                Crear Usuario
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>

        {/* Tabla */}
        {UsersTable(users)}  
      </div>
    </div>
  );
}

export default UsersDashBoard;
