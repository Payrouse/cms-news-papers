import { useEffect, useState } from 'react';

import HomeCarousel from '../../carousel/HomeCarousel';
import HomeCategory from '../../categories/HomeCategory';
import HomeNews from '../../news/HomeNews';
import LastNews from '../../news/LastNews';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-4/5 px-2">
        <div
          className={`flex flex-col w-full 
            md:flex-row-reverse`}
        >
          <div className="md:w-4/12">
            <p className="ml-2 mb-1 font-medium">Categorías:</p>
            <div
              className={`flex flex-nowrap overflow-x-auto pb-2 
                 md:flex-wrap`}
            >
              {isLoading ? (
                <>
                  <div className="w-20 h-8 animate-pulse bg-gray-200 rounded-2xl px-4 py-1 mx-2 md:my-1" />
                  <div className="w-20 h-8 animate-pulse bg-gray-200 rounded-2xl px-4 py-1 mx-2 md:my-1" />
                  <div className="w-20 h-8 animate-pulse bg-gray-200 rounded-2xl px-4 py-1 mx-2 md:my-1" />
                </>
              ) : null}
              {!isLoading &&
                CATEGORIES_LIST.map((category, index) => {
                  return (
                    <HomeCategory
                      key={index}
                      url={`/category/${category.url}`}
                      name={category.name}
                    />
                  );
                })}
            </div>
            <div className="hidden md:flex md:flex-col mt-2">
              <p className="ml-2 mb-1 font-medium">Ultimas noticias:</p>
              <div className="ml-2">
                {isLoading ? (
                  <>
                    <div className="w-full h-7 animate-pulse bg-gray-200 rounded-md px-4 py-1 md:my-1" />
                    <div className="w-full h-7 animate-pulse bg-gray-200 rounded-md px-4 py-1 md:my-1" />
                  </>
                ) : null}
                {!isLoading &&
                  LAST_NEWS_LIST.map((news, index) => {
                    return (
                      <LastNews
                        key={index}
                        time={news.time}
                        title={news.title}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="md:w-8/12 md:border-r pr-2">
            <HomeCarousel />
            <div className="mt-10 mb-10">
              <HomeNews />
              <HomeNews />
              <HomeNews />
              <HomeNews />
              <HomeNews />
              <HomeNews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CATEGORIES_LIST = [
  {
    url: 'politica',
    name: 'Política',
  },
  {
    url: 'deporte',
    name: 'Deporte',
  },
  {
    url: 'educacion',
    name: 'Educación',
  },
  {
    url: 'comida',
    name: 'Comida',
  },
  {
    url: 'politica',
    name: 'Política',
  },
  {
    url: 'deporte',
    name: 'Deporte',
  },
  {
    url: 'educacion',
    name: 'Educación',
  },
  {
    url: 'comida',
    name: 'Comida',
  },
];

const LAST_NEWS_LIST = [
  { time: '10:00', title: 'Hola' },
  { time: '10:05', title: 'Buenas a todos' },
  {
    time: '10:30',
    title:
      'Soy un titulo largo para ver como funca esto con un texto largo jejeje',
  },
  { time: '10:00', title: 'Hola' },
  { time: '10:05', title: 'Buenas a todos' },
  {
    time: '10:30',
    title:
      'Soy un titulo largo para ver como funca esto con un texto largo jejeje',
  },
];

export default Home;
