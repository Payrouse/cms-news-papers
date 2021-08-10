const ReplyComment = () => {
  return (
    <div className="font-extralight my-2 flex flex-col px-10">
      <div className="flex flex-row items-center">
        <img
          className="flex w-11 h-11 rounded-full items-stretch mr-2 border"
          src={
            'https://www.clinicaveterinariazarpa.com/wp-content/uploads/2020/02/vacunas-conejos-blog-ZARPA-27-02-2020.jpg'
          }
          alt="imagen de la noticia"
        ></img>
        <div className="flex flex-col">
          <p>Pedro Conejo </p>
          <p className="italic">Hace 2 semanas</p>
        </div>
      </div>

      <div className="px-2 pt-2 text-justify border-b pb-4">
        <p>
          Thomas Bach, presidente del COI, dijo que los Juegos Olímpicos de
          Tokio con los Juegos de la esperanza, solidaridad y amistad. “Gracias
          Tokio, gracias Japón”, dijo antes de declarar clausurados los Juegos
          2020. La ceremonia concluyó con la extinción del fuego olímpico en el
          llamativo pebetero de Tokio. El programa tuvo la sobriedad japonesa,
          así como muestras de la cultura de este país milenario.
        </p>
      </div>
    </div>
  );
};
export default ReplyComment;
