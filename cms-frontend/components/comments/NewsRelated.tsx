const NewsRelated = () => {
  return (
    <div className=" my-3">
      <div>
        <div className="flex flex-col items-center px-2 relative">
          <img
            className="flex w-96 h-56  items-stretch"
            src={
              'https://www.elcomercio.com/wp-content/uploads/2021/08/Salinas-1.jpg'
            }
            alt="imagen del autor"
          />
          <div className="absolute bottom-0 w-96">
            <p className="bg-black bg-opacity-60 text-white px-1">
              Ocupación hotelera llega al 70% en los balnearios de Santa Elena y
              Playas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewsRelated;
