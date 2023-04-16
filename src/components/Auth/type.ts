export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  specialization: number;
  gender: string;
  phoneNumber: string;
  country: string;
  city: string;
  birthDate: string;
  address: string;
  timeZone: string;
  isLoading?: boolean;
  token?: string | null;
  error?: string | null;
}

export type Option = {
  value: string | number;
};
