import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';
import type { UserResponse } from './authApi';

export type AuthState = {
  user: UserResponse | null;
  token: string | null;
};

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setToken: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token;
    },
    setCurrent: (state, { payload }: PayloadAction<UserResponse>) => {
      state.user = payload;
    },
    unsetToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, setCurrent, unsetToken } = slice.actions;

export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.token;
