import { Button, Modal, TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import User from './users.types';
import UsersTable from './UsersTable';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function UsersDashBoard() {
  const [users, setUsers] = useState<User[]>([
    {
      userName: 'admin',
      name: 'Alan',
      lastName: 'Brito',
      email: 'balan@elmundo.com',
      photoUrl:
        'https://pm1.narvii.com/7516/a23a93d5913cdd3178db840e394d96033c2199f0r1-604-508v2_hq.jpg',
      role: 'User, Administrator',
      status: 'active',
      createdAt: '10/8/2021'
    },
  ]);

  //Inputs
  const [userNameInput, setUserNameInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [lnameInput, setlNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  //Create New User
  const newUser = (event: any) => {
    event.preventDefault();
    let user: User = {
       userName: userNameInput,
       name: nameInput,
       lastName: lnameInput,
       email: emailInput,
       role: "User",
       status: "active",
       photoUrl: "none",
       createdAt: new Date().toLocaleDateString().toString()
    };
    setUsers([...users, user])
    handleClose();
  };

  //Handle Modal Open and Close
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container-views custom-scroll">
      <div className="flex  my-4 content-center items-stretch md:items-center md:justify-evenly">
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
              onChange={(e)=>{setUserNameInput(e.target.value)}}
            />
            <TextField
              id="name-input"
              label="Nombre"
              variant="outlined"
              size="small"
              className="w-full"
              onChange={(e)=>{setNameInput(e.target.value)}}
            />

            <TextField
              id="last_name-input"
              label="Apellido"
              variant="outlined"
              size="small"
              className="w-full"
              onChange={(e)=>{setlNameInput(e.target.value)}}
            />

            <TextField
              id="email-input"
              label="Correo Electrónico"
              variant="outlined"
              size="small"
              className="w-full"
              onChange={(e)=>{setEmailInput(e.target.value)}}
            />

            <TextField
              id="password-input"
              label="Contraseña"
              variant="outlined"
              size="small"
              type="password"
              className="w-full"
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
      {UsersTable(users)}
    </div>
  );
}

export default UsersDashBoard;
