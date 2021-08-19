import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../../redux/types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { AuthValidation } from '../../../../library/Validations';
import ButtonWithSpinner from '../../../buttons/ButtonWithSpinner';
import { ButtonType } from '../../../buttons/Button';
import { FetchApi } from '../../../../library/Http';
import { getMe } from '../../../../redux/actions/userAction';

type UserValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const UpdateUser = () => {
  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [waiting, setWaiting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<UserValues>();

  const handleUpdateUser: SubmitHandler<UserValues> = async (data) => {
    console.log(data);
    setWaiting(true);
    const r = await FetchApi({
      url: `/users/${user.sub}`,
      method: 'PUT',
      body: data,
    });

    if (r.ok) {
      enqueueSnackbar('Se actualizo el articulo', {
        variant: 'success',
      });
      dispatch(getMe());
    } else {
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
    setWaiting(false);
  };

  useEffect(() => {
    if (user) {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email);
    }
  }, []);

  return (
    <>
      <p className="font-semibold mt-1">Información del usuario:</p>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="flex flex-col sm:grid sm:grid-cols-2">
          <Controller
            name="firstName"
            control={control}
            rules={AuthValidation.firstName}
            render={({ field }) => (
              <div className="mx-4 mt-4">
                <TextField
                  {...field}
                  label="Nombre"
                  variant="outlined"
                  placeholder="José"
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName?.message : ''}
                  fullWidth
                  required
                />
              </div>
            )}
          />
          <Controller
            name="lastName"
            control={control}
            rules={AuthValidation.lastName}
            render={({ field }) => (
              <div className="mx-4 mt-4">
                <TextField
                  {...field}
                  label="Apellido"
                  variant="outlined"
                  placeholder="Ochoa"
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName?.message : ''}
                  fullWidth
                  required
                />
              </div>
            )}
          />
        </div>
        <Controller
          name="email"
          control={control}
          rules={AuthValidation.email}
          render={({ field }) => (
            <div className="mx-4 mt-4">
              <TextField
                {...field}
                label="Correo electrónico"
                variant="outlined"
                placeholder="ejemplo@gmail.com"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName?.message : ''}
                fullWidth
                required
              />
            </div>
          )}
        />
        <div className="mt-2 flex justify-end">
          <ButtonWithSpinner
            waiting={waiting}
            type={ButtonType.Submit}
            width="w-auto"
            normalColor="bg-red-600 text-white hover:bg-red-700 border-red-500"
            waitingColor="bg-red-400 text-white border-red-400 cursor-default"
          >
            Actualizar información
          </ButtonWithSpinner>
        </div>
      </form>
    </>
  );
};

export default UpdateUser;
