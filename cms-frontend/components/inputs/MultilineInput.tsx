import { TextField } from '@material-ui/core';
import { UseFormRegister } from 'react-hook-form';

interface MultilineInputProps {
  label: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  validations?: any;
  error: any;
  variant?: string;
  container?: string; // optional
  required?: boolean; // optional
  disabled?: boolean; // optional
}

const MultilineInput = ({
  label,
  name,
  placeholder,
  register,
  validations,
  error,
  required = false,
  variant = 'outlined',
  container = 'mx-4 mt-4',
  disabled = false,
}: MultilineInputProps) => {
  return (
    <>
      <div className={container}>
        <TextField
          id={name}
          label={label}
          variant="outlined"
          placeholder={placeholder}
          fullWidth
          multiline
          minRows={4}
          required={required}
          disabled={disabled}
          {...register(name, validations)}
        />
      </div>
    </>
  );
};

export default MultilineInput;
