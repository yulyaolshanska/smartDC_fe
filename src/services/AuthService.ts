import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'utils/functions/cookies';
import {
  AuthActivationDto,
  AuthCheckEmailDto,
  AuthForgotPasswordDto,
  AuthLoginDto,
  AuthResetPasswordDto,
  AuthSignUpDto,
} from 'services/types/auth.type';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL_SERVER,

    prepareHeaders: (headers) => {
      const token = cookie.get('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),

  endpoints: ({ mutation, query }) => ({
    getMe: query({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
    signUp: mutation({
      query: (data: AuthSignUpDto) => ({
        url: '/auth/registration',
        method: 'POST',
        body: data,
      }),
    }),
    checkEmail: mutation({
      query: (data: AuthCheckEmailDto) => ({
        url: '/auth/checkEmail',
        method: 'POST',
        body: data,
      }),
    }),
    forgotPassword: mutation({
      query: (data: AuthForgotPasswordDto) => ({
        url: '/auth/forgotPassword',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: mutation({
      query: (data: AuthResetPasswordDto) => ({
        url: '/auth/resetPassword',
        method: 'PATCH',
        body: data,
      }),
    }),
    login: mutation({
      query: (data: AuthLoginDto) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    activation: mutation({
      query: (data: AuthActivationDto) => ({
        url: `/auth/activation/${data.link}`,
        method: 'GET',
      }),
    }),
    reactivationLink: mutation({
      query: (id: number) => ({
        url: `/auth/reactivation/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});
