import { CircularProgress } from '@material-ui/core';
import React from 'react';

interface LoadingComponentProps {
  height?: string;
  my?: string;
  width?: string;
  message?: string;
}

const LoadingComponent = ({
  height = 'h-96',
  my = '',
  width = 'w-full',
  message = 'Cargando...',
}: LoadingComponentProps) => {
  return (
    <div className={`${height} ${width} ${my} flex items-center justify-center flex-col`}>
      <CircularProgress />
      <p>{message}</p>
    </div>
  );
};

export default LoadingComponent;
