import Link from 'next/link';
import Router from 'next/router';
import Cookies from 'js-cookie';
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

type LoginValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();

  const handleLogin: SubmitHandler<LoginValues> = async (data) => {
    console.log(data);
    setWaiting(true);
    const r = await FetchApi({
      url: '/auth/login',
      method: 'POST',
      body: data,
    });

    if (r.ok) {
      Cookies.set(Config.cookieName, r.data.accessToken, {
        sameSite: 'strict',
        expires: 7, // expires in 7 days
      });
      Router.replace('/profile');
    } else {
      setWaiting(false);
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white relative sm:overflow-hidden">
      <div
        className={`bg-white h-full w-full max-w-lg px-4 
        flex flex-col justify-center 
        sm:py-12 sm:h-auto sm:rounded-2xl border shadow z-10`}
      >
        <h1 className="text-4xl font-bold text-blue-600 text-center">
          {Config.appName}
        </h1>
        <h1 className="text-center font-bold text-2xl">Bienvenido de Vuelta</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            name="email"
            label="Correo Electrónico"
            placeholder="ejemplo@gmail.com"
            register={register}
            validations={AuthValidation.email}
            required={true}
            error={errors.email}
          />
          <InputPassword
            name="password"
            label="Contraseña"
            register={register}
            validations={{ required: 'Ingrese una contraseña' }}
            required={true}
            error={errors.password}
          />
          <div className="mx-4 mt-4">
            <ButtonWithSpinner waiting={waiting} type={ButtonType.Submit}>
              Iniciar Sesión
            </ButtonWithSpinner>
          </div>
        </form>
        <div className="mt-4 flex flex-col items-center sm:flex-row sm:justify-center">
          <Link href="/register">
            <a className="sm:mr-4 text-blue-500 hover:underline hover:text-blue-600">
              Registrarse ahora
            </a>
          </Link>
          <Link href="/">
            <a className="sm:ml-4 text-blue-500 hover:underline hover:text-blue-600">
              Ir al inicio
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
