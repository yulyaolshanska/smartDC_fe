import { Control, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { Select, MenuItem } from '@mui/material';
import { SignUpFields } from '@types';
import { InputContainer } from '@components/Input/styles';
import { ISignUp, Option } from '@components/Auth/type';

export type Props = {
  options: Option[];
} & TextFieldProps;


export function SelectInput({
  control,
  name,
  label,
  error,
  type,
  placeholder,
  options
}: Props & { control: Control<ISignUp> }) {
  return (
    <InputContainer hasError={!!error}>
      <span>{label}</span>
      <Controller
        control={control}
        defaultValue={placeholder}
        name={name as SignUpFields}
        render={(rest) => (
          <Select
            {...rest}
            id={name}
            type={type}
            // renderValue={(value) => (value ? value: placeholder)}
            placeholder={placeholder}
            defaultValue = "sdlfjskd"
            value={rest.field.value}
            onChange={rest.field.onChange}
            fullWidth
          >
            {options.map((item: any) => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
          </Select>
        )}
      />
    </InputContainer>
  );
}

export default SelectInput;
