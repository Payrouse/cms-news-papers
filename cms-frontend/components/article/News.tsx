import MDEditor from '@uiw/react-md-editor';
import useUser from '../../hooks/data/useUser';
import { ControllerDate } from '../../library/Time';
import { Article } from '../../models/article.model';

interface NewsProps {
  article: Article;
}

const News = ({ article }: NewsProps) => {
  const { user, isError, isLoading } = useUser(article.journalistId);

  return (
    <div>
      <h2 className="items-start font-bold text-3xl">{article?.title}</h2>
      <p className="items-start font-semibold text-2xl">{article?.subtitle}</p>
      {isLoading ? (
        <UserPlaceholder />
      ) : !isError && user ? (
        <div className="flex flex-row my-5">
          <div className="flex items-center px-2">
            <img
              className="w-12 h-12 rounded-full items-stretch"
              src={user.avatar}
              alt="imagen del autor"
            />
          </div>
          <div className="flex flex-col">
            <div className="px-2 font-semibold">{`${user.firstName} ${user.lastName}`}</div>
            <div className="px-2">
              {ControllerDate.parseDate(
                article.publishedAt || article.updatedAt,
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Error</div>
      )}

      <div className="flex justify-center my-5">
        <img
          className="h-96 w-full object-cover rounded"
          src={article?.picture}
          alt="imagen de la noticia"
        />
      </div>

      <div className="flex flex-col text-justify">
        <MDEditor.Markdown source={article.body} />
      </div>
    </div>
  );
};

const UserPlaceholder = () => {
  return (
    <>
      <div className="flex flex-row my-5 items-center">
        <div className="flex items-center px-2">
          <div className="w-12 h-12 rounded-full items-stretch bg-gray-200 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <div className="px-14 py-2 bg-gray-200 animate-pulse rounded" />
          <div className="mt-1 px-14 py-2 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    </>
  );
};

export default News;
