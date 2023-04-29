import { Control, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { TextField } from '@mui/material';
import InputContainer from '@components/Input/styles';
import { FormValues } from '@components/general/type';
import { FieldName } from '@types';
import { BLACK } from '@constants/colors';

export function Input({
  control,
  name,
  label,
  error,
  type,
  placeholder,
  ...props
}: TextFieldProps & { control: Control<FormValues> }) {
  return (
    <InputContainer hasError={!!error}>
      <span>{label}</span>
      <Controller
        control={control}
        defaultValue=""
        name={name as FieldName}
        render={(rest) => (
          <>
            <TextField
              {...props}
              id={name}
              type={type}
              placeholder={placeholder}
              value={rest.field.value}
              sx={{ input: { color: type == 'date' ? `${BLACK}` : null } }}
              onChange={rest.field.onChange}
            />
          </>
        )}
      />
    </InputContainer>
  );
}

export default Input;
