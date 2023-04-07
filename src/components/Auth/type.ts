export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  address: string;
  role: string;
  gender: string;
  city: string;
  country: string;
  time_zone: string;
  specialization:string;
  date_of_birth:string;
}

export type Option = {
  value: string;
};
