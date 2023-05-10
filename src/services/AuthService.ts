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

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL_SERVER,
//   prepareHeaders: (headers) => {
//     const token = cookie.get('accessToken');
//     if (token) {
//       headers.set('authorization', `Bearer ${token}`);
//     }
//     headers.set('Content-Type', 'application/json');
//     return headers;
//   },
// });
// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   console.log('params');

//   console.log(args, api, extraOptions);
//   const result = await baseQuery(args, api, extraOptions);
//   console.log(result);
//   if (cookie.get('accessToken')) {
//     // Save the item in session storage
//     sessionStorage.setItem('userStatus', 'loggedIn');
//   }
//   return result;
// };

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
  }),
});
