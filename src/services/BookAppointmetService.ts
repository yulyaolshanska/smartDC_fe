import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'utils/functions/cookies';

export interface Appointment {
  patientId: number;
  localDoctorId: number;
  remoteDoctorId: number;
  zoomLink: string;
  endTime: string;
  startTime: string;
}

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  tagTypes: ['Appointment', 'Availability'],
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

    getAllAvalibleDoctors: builder.query({
      query: ({ start, end, specialization, limit }) => ({
        url: '/availability',
        method: 'GET',
        params: {
          start,
          end,
          specialization,
          limit,
        },
      }),
    }),

    createAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointment`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Availability'],
    }),
  }),
});

export const {
  useGetSpecializationByIdQuery,
  useGetAllAvalibleDoctorsQuery,
  useCreateAppointmentMutation,
} = appointmentApi;
