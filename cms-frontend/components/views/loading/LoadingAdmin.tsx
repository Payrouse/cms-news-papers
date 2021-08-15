import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from './world.json';

interface LoadingAdminProps {
  message?: string;
}

const LoadingAdmin = ({
  message = 'Estamos cargando tu perfil',
}: LoadingAdminProps) => {
  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-white">
      <div className="flex relative">
        <h1 className="text-4xl font-bold text-blue-600">El Mundo</h1>
        <div className="w-12">
          <div className="absolute" style={{ top: '-125px', left: '50px' }}>
            <Lottie
              style={{ cursor: 'default' }}
              options={lottieOptions}
              isClickToPauseDisabled
              height={300}
              width={300}
            />
          </div>
        </div>
      </div>
      <p className="mt-3">{`${message}`}</p>
    </div>
  );
};

export default LoadingAdmin;
