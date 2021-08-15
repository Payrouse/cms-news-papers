import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FetchApi } from '../../../library/Http';
import { AuthValidation } from '../../../library/Validations';
import { ButtonType } from '../../buttons/Button';
import ButtonWithSpinner from '../../buttons/ButtonWithSpinner';
import Input from '../../inputs/Input';
import InputPassword from '../../inputs/InputPassword';
import { Config } from '../../../config';

type RegisterValues = {
  email: string;
  password: string;
  cPassword: string;
  userName: string;
  firstName: string;
  lastName: string;
};

const RegisterForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>();

  const handleRegister: SubmitHandler<RegisterValues> = async (data) => {
    setWaiting(true);
    const r = await FetchApi({
      url: '/auth/register',
      method: 'POST',
      body: data,
    });

    if (r.ok) {
      enqueueSnackbar('Se ha registrado exitosamente', {
        variant: 'success',
      });
      Router.replace('/login');
    } else {
      setWaiting(false);
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white relative overflow-hidden">
      <div
        className={`bg-white h-full w-full max-w-lg px-4 
        flex flex-col justify-center 
        sm:py-12 sm:h-auto sm:rounded-2xl border shadow z-10`}
      >
        <h1 className="text-4xl font-bold text-blue-600 text-center">
          {Config.appName}
        </h1>
        <h2 className="text-center font-bold text-2xl">Crea una cuenta</h2>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Input
            name="userName"
            label="Nombre de usuario"
            placeholder="jochoa"
            register={register}
            validations={AuthValidation.userName}
            required={true}
            error={errors.userName}
          />
          <Input
            name="email"
            label="Correo Electrónico"
            placeholder="ejemplo@gmail.com"
            register={register}
            validations={AuthValidation.email}
            required={true}
            error={errors.email}
          />
          <div className="flex flex-col md:flex-row">
            <Input
              name="firstName"
              label="Nombre"
              placeholder="José"
              register={register}
              validations={AuthValidation.firstName}
              required={true}
              error={errors.firstName}
            />
            <Input
              name="lastName"
              label="Apellido"
              placeholder="Ochoa"
              register={register}
              validations={AuthValidation.lastName}
              required={true}
              error={errors.lastName}
            />
          </div>
          <InputPassword
            name="password"
            label="Contraseña"
            register={register}
            validations={AuthValidation.password}
            required={true}
            error={errors.password}
          />
          <div className="mx-4 mt-4">
            <ButtonWithSpinner waiting={waiting} type={ButtonType.Submit}>
              Registrarse
            </ButtonWithSpinner>
          </div>
        </form>
        <div className="mt-4 flex flex-col sm:flex-row justify-center items-center">
          <Link href="/login">
            <a className="sm:mr-4 text-blue-500 hover:underline hover:text-blue-600">
              Iniciar sesión
            </a>
          </Link>
          <Link href="/">
            <a className="sm:ml-4 text-blue-500 hover:underline hover:text-blue-600">
              Ir al inicio
            </a>
          </Link>
        </div>
      </div>
      <div
        className="absolute hidden sm:block"
        style={{ height: 500, width: 500, left: '-125px', bottom: '-100px' }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#08BDBA"
            d="M39.1,-41.3C52.6,-25.5,67,-12.8,71.1,4.1C75.2,20.9,69,41.9,55.5,54.7C41.9,67.5,20.9,72.2,-0.5,72.7C-22,73.2,-43.9,69.6,-54.5,56.8C-65,43.9,-64,22,-62.7,1.3C-61.4,-19.3,-59.7,-38.6,-49.1,-54.5C-38.6,-70.3,-19.3,-82.7,-3.3,-79.4C12.8,-76.1,25.5,-57.2,39.1,-41.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div
        className="absolute hidden sm:block"
        style={{ height: 500, width: 500, right: '-125px', top: '-100px' }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#0F62FE"
            d="M37.9,-58.8C45.3,-46.9,44.6,-30.6,48.7,-16.3C52.7,-1.9,61.4,10.4,63.7,26.1C66.1,41.8,62,60.8,50.3,72.6C38.6,84.4,19.3,89.2,0.1,89C-19.1,88.8,-38.2,83.8,-45.4,70.5C-52.7,57.3,-48.2,35.7,-50.8,18.7C-53.3,1.6,-62.9,-11,-61.3,-21.2C-59.8,-31.4,-47,-39.3,-34.9,-49.6C-22.8,-60,-11.4,-72.9,1.9,-75.6C15.3,-78.2,30.6,-70.7,37.9,-58.8Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>
  );
};

export default RegisterForm;
