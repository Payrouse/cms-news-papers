import Router from 'next/router';
import React from 'react';

const HomeNews = () => {
  const handleNews = () => {
    Router.push('/news/news-detail');
  };

  return (
    <div
      className="flex mb-10 items-center cursor-pointer"
      onClick={handleNews}
    >
      <div className="flex flex-col">
        <div>
          <h2 className="font-bold text-lg">
            Activistas marchan en Londres para salvar a una alpaca de ser
            sacrificada
          </h2>
          <p className="text-base">
            Decenas de activistas se congregaron en Londres para protestar en
            contra de una polémica orden judicial que obliga a sacrificar a una
            alpaca que dio positivo dos veces en un test de tuberculosis bovina.
          </p>
        </div>
        <div className="flex text-sm mt-1">
          <p>Agosto 6</p>
          <p className="ml-4 italic">Ambiente</p>
        </div>
      </div>
      <img
        className="ml-1 w-24 h-24 md:w-52 md:h-32 object-contain"
        src="https://www.elcomercio.com/wp-content/uploads/2021/08/alpaca1.jpg"
        alt="img"
      />
    </div>
  );
};

export default HomeNews;
