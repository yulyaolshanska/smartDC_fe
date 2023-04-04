export type OptionType = {
  value: string;
  label: string;
};

export const roles:OptionType[] = [
    { value: 'local', label: 'Local' },
    { value: 'remote', label: 'Remote'},
  ];

  export const specializations = [
    {value: 'anesthesiology', label: 'Anesthesiology'},
    {value: 'cardiology', label: 'Cardiology'}
  ];

  export const gender = [
    {value: 'male', label: 'Male'},
    {value: 'female', label: 'Female'}
  ];

  export const country = [
    {value: 'ukraine', label: 'Ukraine'},
    {value: 'usa', label: 'USA'}
  ];

  export const city = [
    {value: 'kiev', label: 'Kiev'},
    {value: 'odessa', label: 'Odessa'}
  ];

  export const timZones = [
    {value:'GMT-07:00', label:'(GMT-07:00) Phoenix, Tucson, Mesa, Chandler, Gilbert'},
    {value: 'GMT-07:00)', label:'(GMT-07:00) Whitehorse'},
    {value:'GMT-06:00', label:'(GMT-06:00) Mezcales, San Vicente, Bucerías'}

  ]