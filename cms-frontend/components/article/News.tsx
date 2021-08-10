const News = () => {
  return (
      <div>
          <div className="items-start font-bold text-3xl">
            Tokio despide los Olímpicos más importantes para Ecuador
          </div>
          <div className="items-start font-semibold text-2xl">
            El deporte ecuatoriano jamás olvidará los Juegos Olímpicos de Tokio
            2020
          </div>

          <div className="flex flex-row my-5">
            <div className="flex items-center px-2">
              <img
                className="flex w-10 h-10 rounded-full items-stretch"
                src={
                  'https://www.nombresdeperros.eu/wp-content/uploads/2020/12/cachorro-blanco-de-nombre-Toby.jpg'
                }
                alt="imagen del autor"
              />
            </div>

            <div className="flex flex-col">
              <div className="px-2">Juan Palomino Editor</div>
              <div className="px-2">Creado el 07/08/2021</div>
            </div>
          </div>

          <div>
            <div className=" font-extralight my-5">
              <img
                src={
                  'https://www.elcomercio.com/wp-content/uploads/2021/08/JJOO_.jpg'
                }
                alt="imagen de la noticia"
              />
            </div>
          </div>

          <div className="flex flex-col text-justify">
            <p>
              El deporte ecuatoriano jamás olvidará los Juegos Olímpicos de
              Tokio 2020, aunque se realizaron en el 2021. Fue la edición de
              mejor cosecha: dos medallas de oro, una de plata y siete diplomas
              olímpicos. La noche de este domingo 8 de agosto del 2021,
              madrugada para el territorio ecuatoriano, se realizó la Ceremonia
              de Clausura, donde el país del sol naciente despidió a los 15 000
              deportistas que llegaron para competir durante 18 días. Para este
              evento, claro está, que solo acudió una parte pues la mayoría de
              atletas ya retornó a sus países, por protocolos sanitarios para
              prevenir el covid-19. Uno o dos días después de su competencia
              fueron autorizados los atletas en permanecer en territorio
              japonés. La joven marchista, Glenda Morejón fue la encargada de
              portar la Bandera nacional en la ceremonia de clausura mientras
              que en el desfile estuvieron Jhonatan Amores y Karla Jaramillo,
              los otros marchistas, que llegaron desde Sapporo, la subsede
              olímpica, donde se realizaron las pruebas de caminata. Entre lunes
              y martes regresará al país el resto de la delegación nacional que
              participó en los Olímpicos.
            </p>
            <p>
              Koike Yuriko gobernadora del Tokio, devolvió la bandera a Thomas
              Bach, presidente del Comité Olímpico Internacional (COI), y éste
              la entregó a la alcaldesa de París, Anne Hidalgo.Con la entonación
              de la Marsellesa, la burgomaestre de la nueva sede olímpica,
              invitó a los atletas a la próxima edición de los Juegos.
            </p>
          </div>
        </div>
  );
};
export default News;
