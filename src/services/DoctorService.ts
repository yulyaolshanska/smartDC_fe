import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import cookie from 'utils/functions/cookies';

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
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateDoctorProfile: builder.mutation({
      query: (doctor) => ({
        url: `/doctor/${doctor.id}`,
        method: 'PATCH',
        body: doctor,
        staleTime: 1,
      }),
      invalidatesTags: ['Doctor'],
    }),
    updateDoctorPhoto: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append('file', data.blob, 'avatar.png');
        return {
          url: `/doctor/${data.id}/upload`,
          method: 'POST',
          body: formData,
          invalidatesTags: ['Doctor'],
        };
      },
    }),
    getDoctorAvatar: builder.query({
      query: (id) => ({
        url: `/doctor/${id}/avatar`,
        method: 'GET',
      }),
    }),
  }),
});
