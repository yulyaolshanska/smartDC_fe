export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  specialization: number;
  gender: string;
  country: string;
  city: string;
  birthDate: string;
  address: string;
  timeZone: string;
  isLoading?: boolean;
  token?:string;
  error?:string | null;
}

export interface IResponse {
  error: string;
}

export type Option = {
  value: string | number;
};



