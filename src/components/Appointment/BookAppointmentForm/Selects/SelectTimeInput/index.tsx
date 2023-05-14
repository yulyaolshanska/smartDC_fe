import { Control, Controller } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { TextField, Autocomplete } from '@mui/material';
import InputContainer from '@components/Input/styles';
import { FormValues, Option } from '@components/general/type';
import { FieldName } from '@types';

export type Props = {
  options: Option[];
  setFormattedTime: React.Dispatch<React.SetStateAction<string>>;
} & TextFieldProps;

export function SelectTimeInput({
  control,
  name,
  label,
  error,
  placeholder,
  options = [],
  setFormattedTime,
}: Props & { control: Control<FormValues> }) {
  return (
    <InputContainer hasError={!!error}>
      <span>{label}</span>
      <Controller
        control={control}
        name={name as FieldName}
        render={({ field: { ref, onChange, value, ...field } }) => (
          <Autocomplete
            options={options}
            onChange={(_, data) => {
                setFormattedTime(data?.value);
              return onChange(data?.value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                fullWidth
                inputRef={ref}
                placeholder={placeholder}
              />
            )}
            value={options?.find((option) => option.value === value) || null}
          />
        )}
      />
    </InputContainer>
  );
}

export default SelectTimeInput;
