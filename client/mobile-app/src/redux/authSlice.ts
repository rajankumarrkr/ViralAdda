import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserDto } from '@viraladda/shared-types';

interface AuthState {
  user?: UserDto;
  accessToken?: string;
  refreshToken?: string;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: () => initialState
  }
});

export const { setCredentials, logout } = authSlice.actions;
