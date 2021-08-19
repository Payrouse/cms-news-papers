const ProgressBarWithState = ({ progress, error }:any) => {
  const color = error ? 'red' : 'blue';

  return (
    <div className="relative w-44">
      <div className="flex mb-2 items-center justify-between">
        <div>
          <span
            className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${color}-600 bg-${color}-200`}
          >
            {error ? 'Error' : progress < 100 ? 'En progreso' : 'Completado'}
          </span>
        </div>
        <div className="ml-2 text-right">
          <span
            className={`text-xs font-semibold inline-block text-${color}-600`}
          >
            {error ? '' : `${progress.toFixed(2)}%`}
          </span>
        </div>
      </div>
      <div
        className={`overflow-hidden h-2 mb-4 text-xs flex rounded bg-${color}-200`}
      >
        <div
          style={{ width: `${error ? '100' : progress}%` }}
          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarWithState;
