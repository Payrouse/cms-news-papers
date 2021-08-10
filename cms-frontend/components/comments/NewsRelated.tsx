import Link from 'next/link';

const NewsRelated = () => {
  return (
    <Link href="/news/playas">
      <a className="my-2">
        <div className="flex flex-col items-center px-2 relative">
          <img
            className="flex w-96 h-56 object-contain"
            src={
              'https://www.elcomercio.com/wp-content/uploads/2021/08/Salinas-1.jpg'
            }
            alt="imagen del autor"
          />
          <div className="absolute bottom-0 left-0 right-0 flex justify-center">
            <p className="bg-black bg-opacity-60 text-white p-2 w-96">
              Ocupación hotelera llega al 70% en los balnearios de Santa Elena y
              Playas
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};
export default NewsRelated;
