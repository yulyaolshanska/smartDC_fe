export interface InputType {
  type: string;
  placeholder?: string;
}


export type OptionType = {
  value: string;
  label: string;
};


export interface InputOptions {
  title: string;
  options: OptionType[];
}

export type DoctorSubmitValue = {
  role: string;
  specialization: string;
  gender: string;
  country: string;
  city: string;
  date_of_birth: string;
  address: string;
  timezone: string;
};

export interface SignInButtonProps {
  status?: boolean;
  color?: boolean;
}
