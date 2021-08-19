import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';

import { FetchApi } from '../../../../library/Http';
import { AuthValidation } from '../../../../library/Validations';
import InputPassword from '../../../inputs/InputPassword';
import ButtonWithSpinner from '../../../buttons/ButtonWithSpinner';
import { ButtonType } from '../../../buttons/Button';

type PasswordValues = {
  oldPassword: string;
  newPassword: string;
};

const UpdatePassword = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordValues>();

  const handleUpdatePassword: SubmitHandler<PasswordValues> = async (data) => {
    console.log(data);
    setWaiting(true);
    const r = await FetchApi({
      url: `/auth/change-pwd`,
      method: 'POST',
      body: data,
    });

    if (r.ok) {
      enqueueSnackbar('Se actualizo la contraseña', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
    setWaiting(false);
  };

  return (
    <div>
      <p className="font-semibold mt-1">Cambiar contraseña:</p>
      <form onSubmit={handleSubmit(handleUpdatePassword)}>
        <InputPassword
          name="oldPassword"
          label="Contraseña actual"
          register={register}
          validations={{ required: 'Debe ingresar la contraseña actual' }}
          required={true}
          error={errors.oldPassword}
        />
        <InputPassword
          name="newPassword"
          label="Nueva contraseña"
          register={register}
          validations={AuthValidation.password}
          required={true}
          error={errors.newPassword}
        />
        <div className="mt-2 flex justify-end">
          <ButtonWithSpinner
            waiting={waiting}
            type={ButtonType.Submit}
            width="w-auto"
            normalColor="bg-red-600 text-white hover:bg-red-700 border-red-500"
            waitingColor="bg-red-400 text-white border-red-400 cursor-default"
          >
            Actualizar contraseña
          </ButtonWithSpinner>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
