import axios from 'axios';
import { API_URLS } from 'api';

export interface AuthSignUpDto {
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
}

export interface AuthForgotPasswordDto {
  email: string;
}

export interface AuthResetPasswordDto {
  token: string;
  password: string;
}

export const authAPI = {
  signUp(data: AuthSignUpDto) {
    return axios
      .post<AuthSignUpDto>(API_URLS.signUp, data)
      .then((res) => res.data);
  },
  forgotPassword(data: AuthForgotPasswordDto) {
    return axios
      .post<AuthForgotPasswordDto>(API_URLS.forgotPassword, data)
      .then((res) => res.data);
  },
  resetPassword(data: AuthResetPasswordDto) {
    return axios
      .patch<AuthResetPasswordDto>(API_URLS.resetPassword, data)
      .then((res) => res.data);
  },
};
