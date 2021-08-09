import Router from 'next/router';
import { ReactNode } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const HomeCarousel = () => {
  const handleItem = (index: number, item: ReactNode) => {
    console.log(item);
    console.log(index);
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
        img="https://cf.ltkcdn.net/gatos/images/std/236641-800x515r1-etapas-desarrollo-gatitos.jpg"
        title="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi atque quis distinctio voluptatibus repudiandae, vero eius illum vel excepturi at ea exercitationem praesentium nulla ad veniam a accusamus id."
      />
      <ItemCarousel
        img="https://estaticos.muyinteresante.es/media/cache/400x300_thumb/uploads/images/gallery/5971d8bb5bafe86c385a6625/gatito-atigrado-redes.jpg"
        title="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi atque quis distinctio voluptatibus repudiandae, vero eius illum vel excepturi at ea exercitationem praesentium nulla ad veniam a accusamus id."
      />
      <ItemCarousel
        img="https://cf.ltkcdn.net/gatos/images/std/236641-800x515r1-etapas-desarrollo-gatitos.jpg"
        title="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi atque quis distinctio voluptatibus repudiandae, vero eius illum vel excepturi at ea exercitationem praesentium nulla ad veniam a accusamus id."
      />
      <ItemCarousel
        img="https://estaticos.muyinteresante.es/media/cache/400x300_thumb/uploads/images/gallery/5971d8bb5bafe86c385a6625/gatito-atigrado-redes.jpg"
        title="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi atque quis distinctio voluptatibus repudiandae, vero eius illum vel excepturi at ea exercitationem praesentium nulla ad veniam a accusamus id."
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
