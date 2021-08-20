import Cookies from 'js-cookie';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Config } from '../../../config';
import { FetchApi } from '../../../library/Http';
import { endUserLoading, getMe } from '../../../redux/actions/userAction';
import { StoreType } from '../../../redux/types';

import Button, { ButtonType } from '../../buttons/Button';
import Input from '../../inputs/Input';
import MultilineInput from '../../inputs/MultilineInput';

type ComplaintValues = {
  title: string;
  description: string;
};

const ComplaintForm = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: StoreType) => state.user);
  const {enqueueSnackbar} = useSnackbar()


  useEffect(() => {
    if(Cookies.get(Config.cookieName)){
      dispatch(getMe())
    }
    else{
      dispatch(endUserLoading())
    }
  }, [dispatch] );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ComplaintValues>();

  const handleComplaint: SubmitHandler<ComplaintValues> = async (data) => {
    const r = await FetchApi({
      url: '/complaints',
      method: 'POST',
      body: data
    })
   
    if(!r.ok){
      return enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }

    enqueueSnackbar('Denuncia Ciudadana Enviada Existosamente', {
      variant: 'success'
    })
    reset()
  };

  return (
    <div className="flex justify-center my-24">
      <div className="w-full md:w-4/5 px-2">
        <div>
          <h2 className="font-bold text-xl">Denuncia ciudadana</h2>
          <p className="text-base">
            Escriba una denuncia, esta sera enviada al Diario y podrá ser
            publicada en la sección de denuncias.
            Descuide, en caso de publicarse, su denuncia será anónima.
          </p>
        </div>
        <form onSubmit={handleSubmit(handleComplaint)}>
          <Input
            name="title"
            label="Titulo"
            placeholder="Robo en mi casa"
            register={register}
            validations={{}}
            required={true}
            error={errors.title}
          />
          <MultilineInput
            name="description"
            label="Contenido"
            placeholder="El dia de ayer..."
            register={register}
            validations={{}}
            required={true}
            error={errors.description}
          />
          {!isLogin ? (
            <div className="mx-4 mt-4">
              <Link href="/login">
              <Button type={ButtonType.Submit} text="Iniciar Sesión" />
              </Link>
            </div>
          ) : (
            <div className="mx-4 mt-4">
              <Button
                type={ButtonType.Submit}
                text="Enviar Denuncia Ciudadana"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
