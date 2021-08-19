import React, { useState } from 'react';
import { Dialog } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';

import { ControllerDate } from '../../../../library/Time';
import UploaderToGallery from '../../../uploader/UploadToGallery';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../../redux/types';
import { FetchApi } from '../../../../library/Http';
import { useSnackbar } from 'notistack';
import { getMe } from '../../../../redux/actions/userAction';

type AvatarValues = {
  avatar: string;
};

const UpdateAvatar = () => {
  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AvatarValues>();

  const updateLogo: SubmitHandler<AvatarValues> = async (data) => {
    const r = await FetchApi({
      url: `/users/${user.sub}`,
      method: 'PUT',
      body: data,
    });
    if (r.ok) {
      enqueueSnackbar('Se actualizo la foto de perfil', {
        variant: 'success',
      });
      dispatch(getMe());
    } else {
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
  };

  const handleCloseModal = () => {
    setValue('avatar', '');
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex items-center">
        <div className="min-w-max relative">
          <img
            className="h-28 w-28 rounded-full bg-white p-1 shadow object-cover"
            src={user.avatar}
            alt="picture"
          />
          <button
            className="absolute right-2 bottom-1 bg-blue-500 rounded-full p-1 shadow"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <Dialog
        fullWidth
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit(updateLogo)} className="p-6">
          <div>
            <p id="alert-dialog-title" className="title text-lg font-semibold">
              Editar foto de perfil
            </p>
            <p
              id="alert-dialog-description"
              className="text-sm font-medium leading-5 text-gray-500 mt-2"
            >
              Recuerda que la foto de perfil es publica
            </p>
          </div>
          <div className="mt-6">
            <div className="w-full">
              <UploaderToGallery
                container="w-full"
                stgRef={`users/${user.sub}/profile`}
                label="Seleccione o arrastre una foto"
                name="avatar"
                register={register}
                required={{ required: 'Debes agregar una imagen' }}
                error={errors.avatar}
                callbackUrl={setValue}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={handleCloseModal}
              className="flex justify-center items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Actualizar
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default UpdateAvatar;
