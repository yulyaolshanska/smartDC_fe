import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import cookie from 'utils/functions/cookies';

export interface Availability {
  uuid: string;
  title: string;
  start: string;
  end: string;
}

export interface AvailabilityResponse {
  availability: Availability;
}

export const availabilityApi = createApi ({
    reducerPath: 'availabilityApi',
    tagTypes: ['Availability'],
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
        createAvailability: builder.mutation<AvailabilityResponse, { doctorId?: number; availability: Availability }>({
            query: ({ doctorId, availability }) => ({
                url: `/availability/${doctorId}`,
                method: 'POST',
                body: availability,
                staleTime: 1,
            }),
        }),
        getAvailabilitiesForDoctor: builder.query<Availability[], number>({
            query: (doctorId) => ({
                url: `/availability/${doctorId}`,
                method: 'GET',
            }),
            providesTags: (result, error, doctorId) => [
                { type: 'Availability', doctorId },
            ],
        }),
        deleteAvailabilityById: builder.mutation({
            query: ({ doctorId, uuid }) => ({
                url: `/availability/${doctorId}/${uuid}`,
                method: 'DELETE',
            }),
        }),
    }),
});
