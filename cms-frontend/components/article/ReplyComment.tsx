import { ControllerDate } from '../../library/Time';
import { Comment } from '../../models/comment.model';

interface ReplyCommentProps {
  comment: Comment;
}
const ReplyComment = ({ comment }: ReplyCommentProps) => {
  return (
    <div className="font-extralight my-2 flex flex-col px-10">
      <div className="flex flex-row items-center">
        <img
          className="flex w-11 h-11 rounded-full items-stretch mr-2 border"
          src={comment.user.avatar}
          alt="imagen de la noticia"
        ></img>
        <div className="flex flex-col">
          <p>{comment.user.fullName} </p>
          <p className="italic">{ControllerDate.timeAgo(comment.createdAt)}</p>
        </div>
      </div>

      <div className="px-2 pt-2 text-justify border-b pb-4">
        <p>
          {comment.body}
        </p>
      </div>
    </div>
  );
};
export default ReplyComment;
