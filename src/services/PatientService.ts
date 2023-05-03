import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'utils/functions/cookies';
import { CreatePatientDto } from 'services/types/patient.type';
import { IPatient } from '@components/general/type';

export const patientApi = createApi({
  reducerPath: 'patientApi',
  tagTypes: ['Patient'],
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
    createPatient: builder.mutation({
      query: (data: CreatePatientDto) => ({
        url: '/patient',
        method: 'POST',
        body: data,
      }),
    }),
    getPatients: builder.query<IPatient[], string>({
      query: () => '/patient',
    }),
  }),
});

export const { useGetPatientsQuery } = patientApi;
