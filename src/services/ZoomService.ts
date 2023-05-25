import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'utils/functions/cookies';

export const zoomApi = createApi({
  reducerPath: 'zoomApi',
  tagTypes: ['Zoom'],
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
    getSignature: builder.mutation({
      query: (data) => ({
        url: '/zoom',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
