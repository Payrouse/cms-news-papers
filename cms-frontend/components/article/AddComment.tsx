import { TextField } from '@material-ui/core';

const AddComment = () => {
  return (
    <div className="mb-2 mt-1 px-2 flex flex-row items-center">
      <img
        className="flex w-11 h-11 rounded-full items-stretch border mr-2"
        src={
          'https://www.tiendanimal.es/articulos/wp-content/uploads/2018/01/que-necesita-un-gato.jpg'
        }
        alt="imagen de la noticia"
      />
      <TextField
        id="filled-margin-none"
        placeholder="Escribe tu comentario..."
        variant="outlined"
        rowsMax="4"
        size="small"
        multiline
        fullWidth
      />
    </div>
  );
};
export default AddComment;
