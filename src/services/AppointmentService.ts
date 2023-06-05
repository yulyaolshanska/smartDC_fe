import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'utils/functions/cookies';
import { Appointment } from 'services/types/appointment.type';
import { IAuth, IPatient } from '@components/general/type';

export interface IAppointment {
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
    getSpecializationById: builder.query({
      query: (id: number | string) => ({
        url: `/availability/specialization/${id}`,
        method: 'GET',
      }),
      providesTags: ['Appointment'],
    }),
    getTodayAppointment: builder.query({
      query: ({ doctorId, all }: { doctorId: number; all: string }) => ({
        url: `appointment/doctor/${doctorId}/today/${all}`,
        method: 'GET',
      }),
    }),
    getAppointmentForWeek: builder.query<
      Appointment[],
      { id: number; year: number; week: number }
    >({
      query: ({ id, year, week }) => ({
        url: `appointment/patient/${id}/week/${year}/${week}`,
        method: 'GET',
      }),
      providesTags: ['Appointment'],
    }),
    getAppointmentsForDoctor: builder.query<IAppointment[], number>({
      query: (doctorId) => ({
        url: `/appointment/doctor/${doctorId}`,
        method: 'GET',
      }),
      providesTags: (result, error, doctorId) => [
        { type: 'Appointment', doctorId },
      ],
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
      invalidatesTags: ['Appointment'],
    }),
  }),
});

export const {
  useGetSpecializationByIdQuery,
  useGetAppointmentForWeekQuery,
  useGetAllAvalibleDoctorsQuery,
  useCreateAppointmentMutation,
} = appointmentApi;
