import Router from 'next/router';
import { ReactNode } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Article } from '../../models/article.model';

interface HomeCarouselProps {
  articles: any;
}

const HomeCarousel = ({ articles }: HomeCarouselProps) => {
  const handleItem = (index: number, item: ReactNode) => {
    const parsedUrl = articles[index].title.replaceAll(' ', '_');
    Router.push(`/news/${parsedUrl}`);
  };

  return (
    <Carousel
      onClickItem={handleItem}
      autoPlay={true}
      infiniteLoop={true}
      showArrows={true}
      showStatus={false}
      showThumbs={false}
    >
      {articles.map((article: Article, index: number) => {
        return (
          <ItemCarousel
            key={index}
            img={article.picture}
            title={article.title}
          />
        );
      })}
    </Carousel>
  );
};

interface ItemCarouselProps {
  img: string;
  title: string;
}

const ItemCarousel = ({ img, title }: ItemCarouselProps) => {
  return (
    <div className="cursor-pointer">
      <img className="w-full h-96 object-cover" src={img} alt={title} />
      <p className="bg-black bg-opacity-50 rounded-2xl absolute bottom-10 left-4 right-4 p-3 text-center text-white">
        {title}
      </p>
    </div>
  );
};

export default HomeCarousel;
