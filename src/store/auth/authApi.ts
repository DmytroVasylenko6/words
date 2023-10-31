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
    baseUrl: 'http://localhost:3040/api/users',
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
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        console.log('onQueryStarted arg:', arg);
      },
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(arg, { dispatch, getState, extra, requestId }) {
        console.log('onCacheEntryAdded arg:', arg);
      },
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
