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

export interface AuthCheckEmailDto {
  email: string;
}

export interface AuthForgotPasswordDto {
  email: string;
}

export interface AuthResetPasswordDto {
  token: string;
  password: string;
}

export interface AuthLoginDto {
  email: string;
  password: string;
}

export interface AuthActivationDto {
  link: string;
}

export const authAPI = {
  signUp(data: AuthSignUpDto) {
    return axios
      .post<AuthSignUpDto>(API_URLS.signUp, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data;
      });
  },
  checkEmail(data: AuthCheckEmailDto) {
    return axios
      .post<AuthCheckEmailDto>(API_URLS.checkEmail, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data;
      });
  },
  forgotPassword(data: AuthForgotPasswordDto) {
    return axios
      .post<AuthForgotPasswordDto>(API_URLS.forgotPassword, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data;
      });
  },
  resetPassword(data: AuthResetPasswordDto) {
    return axios
      .patch<AuthResetPasswordDto>(API_URLS.resetPassword, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data;
      });
  },
  login(data: AuthLoginDto) {
    return axios
      .post<AuthLoginDto>(API_URLS.login, data)
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data;
      });
  },
  activation(data: AuthActivationDto) {
    return axios
      .get(API_URLS.activation(data.link))
      .then((res) => res.data)
      .catch((error) => {
        throw error.response.data;
      });
  },
};
