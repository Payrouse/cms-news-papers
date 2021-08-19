import { useState } from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
import ForumIcon from '@material-ui/icons/Forum';

import AddComment from './AddComment';
import ReplyComment from './ReplyComment';
import { StoreType } from '../../redux/types';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const Comments = () => {
  const [canReply, setCanReply] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,);

  const showReplyComment = () => {
    if (isLogin) {
      setCanReply(!canReply);
    } else {
      enqueueSnackbar('Por favor logee a su cuenta', {
        variant: 'info',
      });
    }
  };

  return (
    <div className="font-extralight my-2 flex flex-col py-3 border-b">
      <div className="flex flex-row items-center">
        <img
          className="flex w-11 h-11 rounded-full items-stretch mr-2 border"
          src={
            'https://estaticos-cdn.elperiodico.com/clip/9a36bb77-0c88-4b3c-a7dc-f3d41dd85987_alta-libre-aspect-ratio_default_0.jpg'
          }
          alt="imagen de la noticia"
        />
        <div className="flex flex-col">
          <p>Juan Pepe Loro</p>
          <p className="italic">Hace 1 mes</p>
        </div>
      </div>
      <div className="text-justify px-2 pt-2">
        <p>
          Tokio acogió la ceremonia de clausura de los JJ.OO. el 8 de agosto del
          2021. Foto: EFE Martha Córdova, desde Tokio El deporte ecuatoriano
          jamás olvidará los Juegos Olímpicos de Tokio 2020, aunque se
          realizaron en el 2021. Fue la edición de mejor cosecha: dos medallas
          de oro, una de plata y siete diplomas olímpicos. La noche de este
          domingo 8 de agosto del 2021, madrugada para el territorio
          ecuatoriano, se realizó la Ceremonia de Clausura, donde el país del
          sol naciente despidió a los 15 000 deportistas que llegaron para
          competir durante 18 días. Para este evento, claro está, que solo
          acudió una parte pues la mayoría de atletas ya retornó a sus países,
          por protocolos sanitarios para prevenir el covid-19. Uno o dos días
          después de su competencia fueron autorizados los atletas en permanecer
          en territorio japonés.
        </p>
      </div>
      <div className="flex my-2">
        <button
          className="cursor-pointer flex items-center mr-10"
          onClick={() => {
            showReplyComment();
          }}
        >
          <ReplyIcon className="mr-1" />
          Responder
        </button>
        <button
          className="cursor-pointer flex items-center"
          onClick={() => {
            setShowComments(!showComments);
          }}
        >
          <ForumIcon className="mr-1" />
          {showComments ? 'Ocultar respuestas' : 'Ver respuestas'}
        </button>
      </div>
      {canReply ? <AddComment /> : null}
      {showComments ? <ReplyComment /> : null}
    </div>
  );
};

export default Comments;
