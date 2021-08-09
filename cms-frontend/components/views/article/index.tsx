import AddComment from '../../comments/AddComment';
import Comments from '../../comments/Comments';
import News from '../../comments/News';
import NewsRelated from '../../comments/NewsRelated';

const Article = () => {
  return (
    <div className="flex justify-center">
      <div className="md:w-8/12 w-screen px-10 my-10 ">
        <div className="flex flex-col w-full"></div>
        <News />
        <AddComment />
        <Comments />
        <Comments />
        <div className=" flex justify-center bg-gray-100 font-bold text-3xl">
          Noticias Relacionadas
        </div>
        <div className="grid grid-cols-2 gap-1">
          <NewsRelated />
          <NewsRelated />
          <NewsRelated />
        </div>
      </div>
    </div>
  );
};
export default Article;
