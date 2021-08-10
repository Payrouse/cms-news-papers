const ProfileDetails = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="w-32 h-32 mb-4 rounded-full object-cover"
        src="https://imagenes.milenio.com/YONeZ5-2cQu0TH_W2iPiQ_FkzbM=/958x596/https://www.milenio.com/uploads/media/2018/12/25/quieran-comprar-cachorro-acudir-criaderos.jpg"
      />
      <div className="w-48 flex flex-col items-center justify-center">
        <p>Acerca de</p>
        <strong className="my-4">John Doe</strong>
        <div className="text-gray-600 text-center text-wrap">
          Periodista desde 1995, graduado de la Universidad de Harvard.
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
