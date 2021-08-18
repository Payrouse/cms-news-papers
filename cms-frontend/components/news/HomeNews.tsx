import Router from 'next/router';
import React from 'react';
import { ControllerDate } from '../../library/Time';
import { Article } from '../../models/article.model';

interface HomeNewsProps {
  article: Article;
}

const HomeNews = ({ article }: HomeNewsProps) => {

  console.log(article);
  
  const handleNews = () => {
    const parsedUrl = article.title.replaceAll(' ', '_');
    Router.push(`/news/${parsedUrl}`);
  };

  return (
    <div
      className="flex mb-10 items-center cursor-pointer"
      onClick={handleNews}
    >
      <div className="flex flex-col w-full">
        <div>
          <h2 className="font-bold text-lg">{article.title}</h2>
          <p className="text-base">{article.subtitle}</p>
        </div>
        <div className="flex text-sm mt-1">
          <p>{ControllerDate.parseOnlyDate(article.publishedAt)}</p>
          <p className="ml-4 italic">{article.category?.name}</p>
        </div>
      </div>
      <img
        className="ml-1 w-24 h-24 md:w-52 md:h-32 object-contain"
        src={article.picture}
        alt="img"
      />
    </div>
  );
};

export const HomeNewsPlaceholder = () => {
  return (
    <div className="flex mb-10 items-center cursor-pointer">
      <div className="flex flex-col">
        <div>
          <div className="font-bold text-lg bg-gray-200 animate-pulse w-full py-4 px-56 rounded" />
          <p className="mt-1 text-base bg-gray-200 animate-pulse w-full py-2 rounded" />
          <p className="mt-1 text-base bg-gray-200 animate-pulse w-full py-2 rounded" />
          <p className="mt-1 text-base bg-gray-200 animate-pulse w-full py-2 rounded" />
          <p className="mt-1 text-base bg-gray-200 animate-pulse w-full py-2 rounded" />
        </div>
        <div className="flex text-sm mt-1">
          <p className="bg-gray-200 animate-pulse py-2 px-8 rounded" />
          <p className="ml-4 bg-gray-200 animate-pulse px-16 py-2 rounded" />
        </div>
      </div>
      <div className="ml-1 w-24 h-24 md:w-52 md:h-32 bg-gray-200 animate-pulse rounded" />
    </div>
  );
};

export default HomeNews;
