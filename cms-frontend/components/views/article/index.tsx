import AddComment from '../../article/AddComment';
import Comments from '../../article/Comments';
import News from '../../article/News';
import NewsRelated from '../../article/NewsRelated';
import { StoreType } from '../../../redux/types';
import { useSelector } from 'react-redux';

const Article = () => {
  const {isLogin, loading, user } = useSelector(
    (state: StoreType) => state.user,);

    

  return (
    <div className="flex justify-center">
      <div className="md:w-8/12 w-screen px-10 mb-10 ">
        <News />
        <div className="mt-5">
          <p className="font-bold">Comentarios:</p>
          {isLogin ? <AddComment /> : null}
        </div>
        <div className="px-2">
          <Comments />
          <Comments />
        </div>
        <div className="mt-5">
          <h3 className="font-bold text-3xl">Noticias Relacionadas</h3>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-1">
            <NewsRelated />
            <NewsRelated />
            <NewsRelated />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Article;
