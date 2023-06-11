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

export const noteApi = createApi({
  reducerPath: 'noteApi',
  tagTypes: ['Note'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL_SERVER,
    prepareHeaders: (headers) => {
      const token = cookie.get('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPatientNote: builder.query({
      query: ({ patientId, ...params }) => ({
        url: `/notes/all/${patientId}`,
        method: 'GET',
        params,
      }),
      providesTags: ['Note'],
    }),

    createPatientNote: builder.mutation({
      query: (noteData) => {
        const body = new FormData();
        body.append('file', noteData.file[0] ? noteData.file[0] : 1);
        body.append('doctor', noteData.doctorId);
        body.append('patient', noteData.patientId);
        body.append('note', noteData.note);
        return {
          url: '/notes/create',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Note'],
    }),
    downloadFile: builder.query({
      query: (filename) => ({
        url: `/notes/${filename}`,
        method: 'GET',
      }),
    }),
  }),
});
