import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonType } from '../../buttons/Button';
import Input from '../../inputs/Input';

type ComplaintValues = {
  title: string;
  description: string;
};

const ComplaintForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComplaintValues>();

  const handleComplaint: SubmitHandler<ComplaintValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center mb-10">
      <div className="w-full md:w-4/5 px-2">
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
          <Input
            name="description"
            label="Contenido"
            placeholder="El dia de ayer...."
            register={register}
            validations={{}}
            required={true}
            error={errors.description}
          />
          <div className="mx-4 mt-4">
            <Button type={ButtonType.Submit} text="Iniciar Sesión" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
