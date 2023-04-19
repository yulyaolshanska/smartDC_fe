import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import cookie from 'utils/functions/cookies';

export interface IUpdateDoctorProfile {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  birthDate: string;
  country: string;
  city: string;
  address: string;
  timeZone: string;
}

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
  tagTypes: ['Doctor'],
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
  endpoints: (builder) => ({
    updateDoctorProfile: builder.mutation({
      query: (doctor) => ({
        url: `/doctor/${doctor.id}`,
        method: 'PATCH',
        body: doctor,
      }),
      invalidatesTags: ['Doctor'],
    }),
  }),
});
