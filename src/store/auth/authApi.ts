import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '../index';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserResponse {
  name: string;
  email: string;
  subscription: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://words-api-chi.vercel.app/api/users',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: 'signup',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (data) => ({
        url: 'login',
        method: 'POST',
        body: data,
      }),
    }),
    current: builder.mutation<{ user: UserResponse }, void>({
      query: () => ({
        url: 'current',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useCurrentMutation, useSignupMutation } = authApi;
