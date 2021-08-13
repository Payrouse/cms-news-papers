import React from 'react';
import Button from './Button';

const ButtonWithSpinner = ({
  children,
  waiting,
  type,
  height = 'h-12',
  width = 'w-full',
  onClick = () => {},
}: any) => {
  return (
    <button
      type={type}
      className={`${height} ${width} rounded shadow text-center font-bold px-1 py-2
      ${
        waiting
          ? 'bg-blue-400  text-white border-blue-400 cursor-default'
          : 'bg-blue-500  text-white hover:bg-blue-600 border-blue-500'
      }`}
    >
      <div className="flex justify-center">
        {waiting ? (
          <span>
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-0"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        ) : null}
        {children}
      </div>
    </button>
  );
};

export default ButtonWithSpinner;
