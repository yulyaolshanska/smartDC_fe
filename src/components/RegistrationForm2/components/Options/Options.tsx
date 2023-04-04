import { InputOptions, Option } from '../../types';

export const Options = ({ title, options }: InputOptions) => {
  return (
    <>
      <option value="" disabled selected>
        {title}
      </option>
      {options.map(({ value, label }: Option) => (
        <option id={value} value={value}>
          {label}
        </option>
      ))}
    </>
  );
};
