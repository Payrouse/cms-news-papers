import React from 'react';

const profile = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
      <div className="flex">
        <h1 className="text-4xl font-bold text-blue-600">El Mundo</h1>
        <img className="ml-2 h-11 w-11" src={'/worldwide.svg'} alt="img" />
        {/* <img className="ml-2 h-11 w-11" src={'/world.gif'} alt="img" /> */}
      </div>
      <p>Cargando...</p>
    </div>
  );
};

export default profile;
