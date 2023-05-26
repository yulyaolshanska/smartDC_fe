import { string } from 'yup';

export interface IAuth {
  id: number;
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
  id: number;
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
  notes: Note[];
  [key: string]: string | number | Note[] | undefined | null;
}

export type Note = {
  note: string;
};

export type Option = {
  value: string | number;
  label?: string | null;
};

export type AppointmentFormValues = {
  specialization: string;
  appointmentTimeRange: string;
  date: string;
  doctor: string;
};

export type FormValues = IPatient & IAuth & AppointmentFormValues;

export interface ISearch {
  search: string;
}
