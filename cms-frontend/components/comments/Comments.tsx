import CommentIcon from '@material-ui/icons/Comment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useState } from 'react';
import AddComment from './AddComment';
import ReplyComment from './ReplyComment';
const Comments = () => {
    const [canReply, setCanReply] = useState(false);
    const [showComments, setShowComments] = useState(false);
  return (
    <div>
      <div className="shadow-sm font-extralight my-2 flex flex-col">
        <div className="flex flex-row items-center">
          <img
            className="flex w-10 h-10 rounded-full items-stretch"
            src={
              'https://estaticos-cdn.elperiodico.com/clip/9a36bb77-0c88-4b3c-a7dc-f3d41dd85987_alta-libre-aspect-ratio_default_0.jpg'
            }
            alt="imagen de la noticia"
          ></img>
          <div className="flex flex-col">
            <div className="px-1">Juan Pepe Loro</div>
            <div className="px-1">Hace 1 mes</div>
          </div>
        </div>

        <div className="px-1 text-justify">
          <p>
            Tokio acogió la ceremonia de clausura de los JJ.OO. el 8 de agosto
            del 2021. Foto: EFE Martha Córdova, desde Tokio El deporte
            ecuatoriano jamás olvidará los Juegos Olímpicos de Tokio 2020,
            aunque se realizaron en el 2021. Fue la edición de mejor cosecha:
            dos medallas de oro, una de plata y siete diplomas olímpicos. La
            noche de este domingo 8 de agosto del 2021, madrugada para el
            territorio ecuatoriano, se realizó la Ceremonia de Clausura, donde
            el país del sol naciente despidió a los 15 000 deportistas que
            llegaron para competir durante 18 días. Para este evento, claro
            está, que solo acudió una parte pues la mayoría de atletas ya
            retornó a sus países, por protocolos sanitarios para prevenir el
            covid-19. Uno o dos días después de su competencia fueron
            autorizados los atletas en permanecer en territorio japonés.
          </p>
        </div>
        <div className="flex space-x-10  my-2 ">
            <AddCircleOutlineIcon className="cursor-pointer" onClick={() => {setCanReply(!canReply)}}/>
            <CommentIcon className="cursor-pointer" onClick ={() => {setShowComments(!showComments)}}/>
            
        </div>
        {canReply? <AddComment/> : null}
        {showComments ? <ReplyComment/> : null}
        
      </div>
    </div>
  );
};

export default Comments;
