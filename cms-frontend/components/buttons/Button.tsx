export enum ButtonType {
  Button = 'button',
  Reset = 'reset',
  Submit = 'submit',
}

interface ButtonProps {
  text: string;
  type: ButtonType;
  onClick?(): any;
  color?: string;
  textColor?: string;
  height?: string;
  width?: string;
}

const Button = ({
  text,
  type,
  color = 'bg-blue-500 hover:bg-blue-600',
  textColor = 'text-white',
  height = 'h-12',
  width = 'w-full',
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      className={`${color} ${textColor} ${height} ${width} rounded shadow text-center font-bold px-1 py-2`}
      type={type}
      onClick={onClick}
    >
      <p className="w-full flex justify-center">{text}</p>
    </button>
  );
};

export default Button;
