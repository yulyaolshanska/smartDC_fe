export interface IAuth {
  id?: number;
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
  availabilities?: null | string;
  token?: string | null;
  error?: string | null;
}

export interface IPatient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  country: string;
  city: string;
  birthDate: string;
  address: string;
  timeZone: string;
  overview: string;
}

export type Option = {
  value: string | number;
};

export type FormValues = IPatient & IAuth & ISearch;

export interface ISearch {
  search: string;
}
