import Router from 'next/router';
import { ReactNode } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomeCarousel = () => {
  const handleItem = (index: number, item: ReactNode) => {
    Router.push(`/news/${'comida-gratis'}`);
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
      <ItemCarousel
        img="https://www.elcomercio.com/wp-content/uploads/2021/08/E7t4CSgXoAgC1OF-scaled.jpg"
        title="FIA mantiene la descalificación de Vettel en Hungría durante el Mundial de F1"
      />
      <ItemCarousel
        img="https://www.elcomercio.com/wp-content/uploads/2021/08/obama.jpg"
        title="Filtran fotos de la lujosa y multitudinaria fiesta que celebró Barack Obama por su 60 cumpleaños"
      />
      <ItemCarousel
        img="https://www.elcomercio.com/wp-content/uploads/2021/08/pasesfalsos.jpg"
        title="La policía italiana desbarata una trama de pases sanitarios falsos en grupos de Telegram"
      />
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
      <img className="w-full h-96" src={img} alt="dasdas" />
      <p className="bg-black bg-opacity-50 rounded-2xl absolute bottom-10 left-4 right-4 p-3 text-center text-white">
        {title}
      </p>
    </div>
  );
};

export default HomeCarousel;
