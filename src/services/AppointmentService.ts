import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import cookie from 'utils/functions/cookies';

export const appointmentsApi = createApi({
  reducerPath: 'appointmentsApi',
  tagTypes: ['Appointments'],
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
  endpoints: ({ query }) => ({
    getTodayAppointment: query({
      query: ({ doctorId, all }) => ({
        url: `appointment/doctor/${doctorId}/today/${all}`,
        method: 'GET',
      }),
    }),
  }),
});
