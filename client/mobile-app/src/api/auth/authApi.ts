import type { AuthResponse, UserDto } from '@viraladda/shared-types';
import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['Me']
    }),
    register: builder.mutation<AuthResponse, { username: string; email: string; password: string }>({
      query: (body) => ({ url: '/auth/register', method: 'POST', body }),
      invalidatesTags: ['Me']
    }),
    me: builder.query<UserDto, void>({
      query: () => '/auth/me',
      providesTags: ['Me']
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
