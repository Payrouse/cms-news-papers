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
    </div>
  );
};

export default RegisterForm;
