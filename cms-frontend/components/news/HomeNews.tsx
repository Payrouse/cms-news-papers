import Router from 'next/router';
import React from 'react';

const HomeNews = () => {
  const handleNews = () => {
    Router.push('/news/news-detail');
  };

  return (
    <div className="flex mb-10 items-center cursor-pointer" onClick={handleNews}>
      <div className="flex flex-col">
        <div>
          <h2 className="font-bold text-lg">
            Remove Your If-Else and Switch Cases
          </h2>
          <p className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque,
            nulla quidem ducimus facilis ad fuga accusamus autem! Earum qui
            dolores, aperiam, rem natus nobis magni repellat minus tempore eaque
            dolore.
          </p>
        </div>
        <div className="flex text-sm mt-1">
          <p>Agosto 6</p>
          <p className="ml-4 italic">Tecnología</p>
        </div>
      </div>
      <img
        className="ml-1 w-52 h-32 object-contain"
        src="https://i1.wp.com/hipertextual.com/wp-content/uploads/2021/02/apple_macos-bigsur-1.jpg"
        alt="img"
      />
    </div>
  );
};

export default HomeNews;
