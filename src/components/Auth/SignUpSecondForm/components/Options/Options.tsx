import { InputOptions, OptionType} from '../../types';

export const Options:React.ElementType = ({ title, options }: InputOptions):JSX.Element => {
  debugger;
  return (
    <>
      <option value="" disabled selected>
        {title}
      </option>
      {options.map(({ value, label }: OptionType) => (
        <option id={value} value={value}>
          {label}
        </option>
      ))}
    </>
  );
};
