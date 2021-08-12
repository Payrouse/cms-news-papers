import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FetchApi } from '../../../library/Http';
import { AuthValidation } from '../../../library/Validations';

import Button, { ButtonType } from '../../buttons/Button';
import Input from '../../inputs/Input';
import InputPassword from '../../inputs/InputPassword';

type RegisterValues = {
  email: string;
  password: string;
  cPassword: string;
  userName: string;
  firstName: string;
  lastName: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>();

  const handleRegister: SubmitHandler<RegisterValues> = async (data) => {
    console.log(data);
    const r = await FetchApi({
      url: '/auth/register',
      method: 'POST',
      body: data,
    });
    console.log('response', r);
    console.log('response', await r.json());
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className={`bg-white h-full w-full max-w-lg px-4 
        flex flex-col justify-center 
        sm:py-12 sm:h-auto sm:rounded-2xl border shadow`}
      >
        <h1 className="text-center font-bold text-2xl">Crea una cuenta</h1>
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
          {/* <InputPassword
            name="cPassword"
            label="Confirmar contraseña"
            register={register}
            validations={{}}
            required={true}
            error={errors.cPassword}
          /> */}
          <div className="mx-4 mt-4">
            <Button type={ButtonType.Submit} text="Registrarse" />
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <Link href="/login">
            <a className="mr-4 text-blue-500 hover:underline hover:text-blue-600">
              Iniciar sesión
            </a>
          </Link>
          <Link href="/">
            <a className="ml-4 text-blue-500 hover:underline hover:text-blue-600">
              Ir al inicio
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
