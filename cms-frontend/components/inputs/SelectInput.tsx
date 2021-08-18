import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { UseFormRegister } from 'react-hook-form';

interface SelectInputProps {
  label: string;
  name: string;
  items: any[];
  keyValue: string;
  keyName: string;
  register: UseFormRegister<any>;
  validations?: any;
  error: any;
  variant?: string;
  container?: string; // optional
  required?: boolean; // optional
  disabled?: boolean; // optional
}

const SelectInput = ({
  label,
  name,
  items,
  keyValue,
  keyName,
  register,
  validations,
  error,
  required = false,
  variant = 'outlined',
  container = 'mx-4 mt-4',
  disabled = false,
}: SelectInputProps) => {
  return (
    <div className={container}>
      <FormControl
        variant="outlined"
        required={required}
        disabled={disabled}
        fullWidth
        error={error}
      >
        <InputLabel id={name + '-label'}>{label}</InputLabel>
        <Select
          labelId={name + '-label'}
          id={name + '-id'}
          label={label}
          {...register(name, validations)}
        >
          {items.map((item, index) => {
            return (
              <MenuItem key={index} value={item[keyValue]}>
                {item[keyName]}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{error?.message || ''}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default SelectInput;
