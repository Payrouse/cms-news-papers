import { Button, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FetchApi } from '../../library/Http';
import { StoreType } from '../../redux/types';

type FormData = {
  body: string;
  userId: string;
  articleId: string;
};

const AddComment = ({ userId, articleId, commentRoot }: any) => {
  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );
  const { register, handleSubmit, reset } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    data.articleId = articleId;
    data.userId = userId;

    let body: any = data;
    if (commentRoot) body.commentRoot = commentRoot;
    const r = await FetchApi({
      url: '/comments',
      method: 'POST',
      body,
    });

    if (r.ok) {
      reset();
      enqueueSnackbar('Comentario agregado', {
        variant: 'success',
      });
    } else {
      enqueueSnackbar(r.error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <form
      className="mb-2 mt-1 px-2 flex flex-row items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img
        className="flex w-11 h-11 rounded-full items-stretch border mr-2"
        src={user.avatar}
        alt="imagen de la noticia"
      />
      <TextField
        {...register('body', { minLength: 10, maxLength: 50 })}
        id="filled-margin-none"
        placeholder="Escribe tu comentario..."
        variant="outlined"
        rowsMax="4"
        size="small"
        multiline
        fullWidth
      />
      <div className="ml-2">
        <Button variant="contained" color="primary" type="submit">
          Enviar
        </Button>
      </div>
    </form>
  );
};
export default AddComment;
