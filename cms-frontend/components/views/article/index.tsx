import AddComment from '../../article/AddComment';
import Comments from '../../article/Comments';
import News from '../../article/News';
import NewsRelated from '../../article/NewsRelated';
import { StoreType } from '../../../redux/types';
import { useSelector } from 'react-redux';
import useArticleByTitle from '../../../hooks/data/useArticleByTitle';
import useCommentsByArticle from '../../../hooks/data/useCommentsByArticle';
import useNewsRelated from '../../../hooks/data/useNewsRelated';
import LoadingComponent from '../loading/LoadingComponent';

const Article = ({ route }: any) => {
  const { isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,
  );
  const { article, isError, isLoading } = useArticleByTitle(route);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <LoadingComponent
          height="h-96"
          message="Cargando articulo..."
          my="my-32"
        />
      ) : !isError && article ? (
        <div className="md:w-8/12 w-screen px-10 mb-10 ">
          <News article={article} />
          <div className="mt-5">
            <p className="font-bold">Comentarios:</p>
            {isLogin ? (
              <AddComment userId={user.sub} articleId={article.articleId} />
            ) : (
              <div className="flex border rounded py-2 pl-2 text-center">Debe iniciar sesión para comentar</div>
            )}
          </div>
          <div className="px-2">
            <ListComments articleId={article.articleId} />
          </div>
          <div className="mt-5">
            <h3 className="font-bold text-3xl">Noticias Relacionadas</h3>
            <div >
              <ListNewsRelated categoryId={article.category?.categoryId} />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-96 my-32 flex justify-center items-center">
          No existe el articulo
        </div>
      )}
    </div>
  );
};

const ListComments = ({ articleId }: any) => {
  const { comments, isError, isLoading } = useCommentsByArticle(articleId);
  return (
    <div>
      {isLoading ? (
        <LoadingComponent height="h-32" message="Cargando comentarios..." />
      ) : !isError && comments.length > 0 ? (
        <>
          {comments.map((comment: any, index: number) => {
            return <Comments comment={comment} key={index} />;
          })}
        </>
      ) : (
        <div>No existen Comentarios</div>
      )}
    </div>
  );
};

const ListNewsRelated = ({ categoryId }: any) => {
  const { news, isLoading, isError } = useNewsRelated(categoryId);
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 gap-1">
      {isLoading ? (
        <LoadingComponent
          height="h-32"
          message="Cargando noticias relacionadas..."
        />
      ) : !isError && news.length > 0 ? (
        <>
          {news.map((news: any, index: number) => {
            return <NewsRelated article={news} key={index} />;
          })}
        </>
      ) : (
        <div> No existen noticias relacionadas </div>
      )}
    </div>
  );
};
export default Article;
