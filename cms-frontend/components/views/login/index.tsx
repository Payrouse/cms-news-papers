import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

import Input from '../../inputs/Input';
import InputPassword from '../../inputs/InputPassword';
import Button, { ButtonType } from '../../buttons/Button';

type LoginValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>();
  const handleLogin: SubmitHandler<LoginValues> = async (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className={`bg-white h-full w-full max-w-lg px-4 
        flex flex-col justify-center 
        sm:py-12 sm:h-auto sm:rounded-2xl border shadow`}
      >
        <h1 className="text-center font-bold text-2xl">Bienvenido de Vuelta</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Input
            name="email"
            label="Correo Electrónico"
            placeholder="ejemplo@gmail.com"
            register={register}
            validations={{}}
            required={true}
            error={errors.email}
          />
          <InputPassword
            name="password"
            label="Contraseña"
            register={register}
            validations={{}}
            required={true}
            error={errors.password}
          />
          <div className="mx-4 mt-4">
            <Button type={ButtonType.Submit} text="Iniciar Sesión" />
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          <Link href="/register">
            <a className="mr-4 text-blue-500 hover:underline hover:text-blue-600">
              Registrarse ahora
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

export default LoginForm;
