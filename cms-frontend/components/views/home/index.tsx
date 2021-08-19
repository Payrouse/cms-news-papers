import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

import HomeCarousel from '../../carousel/HomeCarousel';
import HomeCategory from '../../categories/HomeCategory';
import HomeNews, { HomeNewsPlaceholder } from '../../news/HomeNews';
import LastNews from '../../news/LastNews';
import useLastNews from '../../../hooks/data/useLastNews';
import useFeedNews from '../../../hooks/data/useFeedNews';
import useAllCategories from '../../../hooks/data/useAllCategories';
import useHighlightsNews from '../../../hooks/data/useHighlightsNews';

const Home = () => {
  const { categories, isError, isLoading } = useAllCategories();
  const { articles: lastNews, isLoading: loadingLastNews } = useLastNews();
  const { articles: feedNews, isLoading: loadingFeed } = useFeedNews();
  const { articles: highlights, isLoading: loadingHglt } = useHighlightsNews();

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
                categories.map((category, index) => {
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
                {loadingLastNews ? (
                  <>
                    <div className="w-full h-7 animate-pulse bg-gray-200 rounded-md px-4 py-1 md:my-1" />
                    <div className="w-full h-7 animate-pulse bg-gray-200 rounded-md px-4 py-1 md:my-1" />
                  </>
                ) : null}
                {!loadingLastNews &&
                  lastNews.map((news, index) => {
                    return (
                      <LastNews
                        key={index}
                        time={news.publishedAt}
                        title={news.title}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="md:w-8/12 md:border-r pr-2">
            {loadingHglt ? <div></div> : null}
            {!loadingHglt && highlights.length > 0 ? (
              <HomeCarousel articles={highlights} />
            ) : null}
            <div className="mt-10 mb-10">
              {loadingFeed ? (
                <>
                  <HomeNewsPlaceholder />
                  <HomeNewsPlaceholder />
                </>
              ) : null}
              {!loadingFeed &&
                feedNews.map((news, index) => {
                  return <HomeNews key={index} article={news} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
