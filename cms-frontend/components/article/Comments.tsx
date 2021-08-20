import { useState } from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
import ForumIcon from '@material-ui/icons/Forum';

import AddComment from './AddComment';
import ReplyComment from './ReplyComment';
import { StoreType } from '../../redux/types';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Comment } from '../../models/comment.model';
import { ControllerDate } from '../../library/Time';
import useRepliesByComment from '../../hooks/data/useRepliesByComment';
import LoadingComponent from '../views/loading/LoadingComponent';
interface CommentsProps {
  comment: Comment;
}
const Comments = ({ comment }: CommentsProps) => {
  const [canReply, setCanReply] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );

  const showReplyComment = () => {
    if (isLogin) {
      setCanReply(!canReply);
    } else {
      enqueueSnackbar('Debe iniciar sesión para comentar', {
        variant: 'info',
      });
    }
  };

  return (
    <div className="font-extralight my-2 flex flex-col py-3 border-b">
      <div className="flex flex-row items-center">
        <img
          className="flex w-11 h-11 rounded-full items-stretch mr-2 border"
          src={comment.user.avatar}
          alt="imagen de la noticia"
        />
        <div className="flex flex-col">
          <p>{comment.user.fullName}</p>
          <p className="italic">{ControllerDate.timeAgo(comment.createdAt)}</p>
        </div>
      </div>
      <div className="text-justify px-2 pt-2">
        <p>{comment.body}</p>
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
      {canReply ? (
        <AddComment
          userId={user.sub}
          commentRoot={comment.commentId}
          articleId={comment.articleId}
        />
      ) : null}
      {showComments ? (
        <ListCommentsReplies commentRoot={comment.commentId} />
      ) : null}
    </div>
  );
};

const ListCommentsReplies = ({ commentRoot }: any) => {
  const { comments, isError, isLoading } = useRepliesByComment(commentRoot);
  return (
    <div>
      <div>
        {isLoading ? (
          <LoadingComponent height="h-32" message="Cargando respuestas..." />
        ) : !isError && comments.length > 0 ? (
          <>
            {comments.map((comment: any, index: number) => {
              return <ReplyComment comment={comment} key={index} />;
            })}
          </>
        ) : (
          <div>No existen respuestas</div>
        )}
      </div>
    </div>
  );
};

export default Comments;
