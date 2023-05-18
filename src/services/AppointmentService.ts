import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'utils/functions/cookies';
import { IAuth, IPatient } from '@components/general/type';

export interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  patient: IPatient;
  localDoctor: IAuth;
  remoteDoctor: IAuth;
  zoomLink: string;
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
    getAppointmentsForDoctor: builder.query<Appointment[], number>({
      query: (doctorId) => ({
        url: `/appointment/doctor/${doctorId}`,
        method: 'GET',
      }),
      providesTags: (result, error, doctorId) => [
        { type: 'Appointment', doctorId },
      ],
    }),
  }),
});
