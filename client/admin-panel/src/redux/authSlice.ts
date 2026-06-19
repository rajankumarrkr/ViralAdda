import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserDto } from '@viraladda/shared-types';

interface AuthState {
  user?: UserDto;
  token?: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('viraladda.admin.token') ?? undefined
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdminAuth(state, action: PayloadAction<{ user: UserDto; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('viraladda.admin.token', action.payload.token);
    },
    logoutAdmin() {
      localStorage.removeItem('viraladda.admin.token');
      return {};
    }
  }
});

export const { setAdminAuth, logoutAdmin } = authSlice.actions;
