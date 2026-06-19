import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthResponse } from '@viraladda/shared-types';
import type { RootState } from '../redux/store';

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Dashboard', 'Users', 'Videos', 'Categories', 'Analytics'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body })
    }),
    dashboard: builder.query<{ totalUsers: number; totalVideos: number; totalViews: number; totalComments: number }, void>({
      query: () => '/admin/dashboard',
      providesTags: ['Dashboard']
    }),
    users: builder.query<any[], void>({ query: () => '/admin/users', providesTags: ['Users'] }),
    videos: builder.query<any[], void>({ query: () => '/admin/videos', providesTags: ['Videos'] }),
    approveVideo: builder.mutation<any, string>({ query: (id) => ({ url: `/admin/videos/${id}/approve`, method: 'PATCH' }), invalidatesTags: ['Videos', 'Dashboard'] }),
    rejectVideo: builder.mutation<any, string>({ query: (id) => ({ url: `/admin/videos/${id}/reject`, method: 'PATCH' }), invalidatesTags: ['Videos'] }),
    deleteVideo: builder.mutation<any, string>({ query: (id) => ({ url: `/admin/videos/${id}`, method: 'DELETE' }), invalidatesTags: ['Videos', 'Dashboard'] }),
    blockUser: builder.mutation<any, string>({ query: (id) => ({ url: `/admin/users/${id}/block`, method: 'PATCH' }), invalidatesTags: ['Users'] }),
    unblockUser: builder.mutation<any, string>({ query: (id) => ({ url: `/admin/users/${id}/unblock`, method: 'PATCH' }), invalidatesTags: ['Users'] }),
    deleteUser: builder.mutation<any, string>({ query: (id) => ({ url: `/admin/users/${id}`, method: 'DELETE' }), invalidatesTags: ['Users', 'Dashboard'] }),
    categories: builder.query<any[], void>({ query: () => '/admin/categories', providesTags: ['Categories'] }),
    createCategory: builder.mutation<any, { name: string }>({ query: (body) => ({ url: '/admin/categories', method: 'POST', body }), invalidatesTags: ['Categories'] }),
    analytics: builder.query<any[], void>({ query: () => '/admin/analytics', providesTags: ['Analytics'] })
  })
});

export const {
  useLoginMutation,
  useDashboardQuery,
  useUsersQuery,
  useVideosQuery,
  useApproveVideoMutation,
  useRejectVideoMutation,
  useDeleteVideoMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
  useCategoriesQuery,
  useCreateCategoryMutation,
  useAnalyticsQuery
} = adminApi;
