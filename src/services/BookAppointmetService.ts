import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'utils/functions/cookies';

export interface Appointment {
  id: number;
  uuid: string;
  title: string;
  start: string;
  end: string;
  doctor: object;
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  tagTypes: ['Appointment'],
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
    getSpecializationById: builder.query({
      query: (id: number | string) => ({
        url: `/availability/specialization/${id}`,
        method: 'GET',
      }),
    }),

    getAllAvalibleDoctors: builder.mutation({
      query: (args: { start: any, end: any, specialization: number, limit: number }) => ({
        url: `/availability?${args.start}&${args.end}&${args.specialization}&${args.limit}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetSpecializationByIdQuery, useGetAllAvalibleDoctorsMutation } = appointmentApi;
