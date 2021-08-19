import Link from 'next/link';
import { Article } from '../../models/article.model';
interface NewsRelatedProps {
  article: Article;
}

const NewsRelated = ({ article }: NewsRelatedProps) => {
  const getUrl = () => {
    return article.title.replaceAll(' ', '_');
  };

  return (
    <Link href={`/news/${getUrl()}`}>
      <a className="my-2">
        <div className="flex flex-col items-center px-2 relative">
          <img
            className="flex w-96 h-56 object-contain"
            src={article.picture}
            alt="imagen del autor"
          />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <p className="bg-black bg-opacity-60 text-white p-2 w-96">
              {article.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};
export default NewsRelated;
