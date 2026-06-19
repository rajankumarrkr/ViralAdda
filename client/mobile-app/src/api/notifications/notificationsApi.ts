import { baseApi } from '../baseApi';

export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    notifications: builder.query<any[], void>({
      query: () => '/notifications',
      providesTags: ['Notifications']
    }),
    markNotificationRead: builder.mutation<any, string>({
      query: (id) => ({ url: `/notifications/${id}/read`, method: 'PATCH' }),
      invalidatesTags: ['Notifications']
    })
  })
});

export const { useNotificationsQuery, useMarkNotificationReadMutation } = notificationsApi;
