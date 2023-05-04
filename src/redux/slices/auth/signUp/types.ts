export default interface SignUpInitialState {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  specialization?: number;
  gender?: string;
  country?: string;
  city?: string;
  birthDate?: string;
  address?: string;
  timeZone?: string;
  isLoading: boolean;
  token?: null | string;
  error?: null | string;
  availabilities?: null | string;
}
