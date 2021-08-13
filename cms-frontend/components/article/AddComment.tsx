import { Button, TextField } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  comment: string;
};

const AddComment = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);
  return (
    <form
      className="mb-2 mt-1 px-2 flex flex-row items-center  shadow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        className="flex w-11 h-11 rounded-full items-stretch border mr-2"
        src={
          'https://www.tiendanimal.es/articulos/wp-content/uploads/2018/01/que-necesita-un-gato.jpg'
        }
        alt="imagen de la noticia"
      />
      <TextField
        {...register('commet', { minLength: 10, maxLength: 50 })}
        id="filled-margin-none"
        placeholder="Escribe tu comentario..."
        variant="outlined"
        rowsMax="4"
        size="small"
        multiline
        fullWidth
      />
      <Button variant="contained" color="primary" type="submit">
        Enviar
      </Button>
    
    </form>
  );
};
export default AddComment;
