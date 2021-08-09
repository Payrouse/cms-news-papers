import {
  createStyles,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  Theme,
} from '@material-ui/core';
import clsx from 'clsx';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputPasswordProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  validations: any;
  error: any;
  variant?: string;
  container?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputPassword = ({
  label,
  name,
  register,
  validations,
  error,
  required = false,
  variant = 'outlined',
  container = 'mx-4 mt-4',
  disabled = false,
}: InputPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={container}>
      <FormControl
        variant="outlined"
        required={required}
        disabled={disabled}
        fullWidth
      >
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <OutlinedInput
          id={name}
          type={showPassword ? 'text' : 'password'}
          {...register(name, validations)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
    </div>
  );
};

export default InputPassword;
