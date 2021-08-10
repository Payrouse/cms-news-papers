import AddComment from '../../comments/AddComment';
import Comments from '../../comments/Comments';
import News from '../../comments/News';
import NewsRelated from '../../comments/NewsRelated';

const Article = () => {
  return (
    <div className="flex justify-center">
      <div className="md:w-8/12 w-screen px-10 mb-10 ">
        <News />
        <div className="mt-5">
          <p className="font-bold">Comentarios:</p>
          <AddComment />
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
