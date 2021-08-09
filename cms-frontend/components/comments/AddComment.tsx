const AddComment = () => {
  return (
    <div className="shadow-md font-extralight my-5 flex flex-row ">
      <img
        className="flex w-10 h-10 rounded-full items-stretch"
        src={
          'https://www.tiendanimal.es/articulos/wp-content/uploads/2018/01/que-necesita-un-gato.jpg'
        }
        alt="imagen de la noticia"
      ></img>
      <input
        className="w-full"
        type="text"
        name="name"
        placeholder="Agregar un comentario..."
      />
    </div>
  );
};
export default AddComment;
