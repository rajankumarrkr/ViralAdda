import type { UserDto, VideoDto } from '@viraladda/shared-types';
import { baseApi } from '../baseApi';

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query<UserDto, void>({ query: () => '/users/profile', providesTags: ['Me'] }),
    updateProfile: builder.mutation<UserDto, Partial<UserDto>>({
      query: (body) => ({ url: '/users/profile', method: 'PUT', body }),
      invalidatesTags: ['Me']
    }),
    watchHistory: builder.query<VideoDto[], void>({ query: () => '/users/watch-history' }),
    likedVideos: builder.query<VideoDto[], void>({ query: () => '/users/liked-videos' })
  })
});

export const { useProfileQuery, useUpdateProfileMutation, useWatchHistoryQuery, useLikedVideosQuery } = usersApi;
