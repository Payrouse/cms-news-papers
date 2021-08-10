import { TextField } from '@material-ui/core';
import { UseFormRegister } from 'react-hook-form';

export enum InputTypes {
  Text = 'text',
  Number = 'number',
}

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  validations?: any;
  error: any;
  type?: InputTypes;
  variant?: string;
  container?: string; // optional
  required?: boolean; // optional
  disabled?: boolean; // optional
}

const Input = ({
  label,
  name,
  placeholder,
  register,
  validations,
  error,
  required = false,
  type = InputTypes.Text,
  variant = 'outlined',
  container = 'mx-4 mt-4',
  disabled = false,
}: InputProps) => (
  <>
    <div className={container}>
      <TextField
        id={name}
        label={label}
        variant="outlined"
        placeholder={placeholder}
        type={type}
        fullWidth
        required={required}
        disabled={disabled}
        {...register(name, validations)}
      />
    </div>
  </>
);

export default Input;
