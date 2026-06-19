import type { PaginatedResponse, VideoDto } from '@viraladda/shared-types';
import { baseApi } from '../baseApi';

export const videosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    videos: builder.query<PaginatedResponse<VideoDto>, { page?: number; search?: string; sort?: 'latest' | 'trending' }>({
      query: (params) => ({ url: '/videos', params }),
      providesTags: ['Videos']
    }),
    video: builder.query<VideoDto, string>({
      query: (id) => `/videos/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Videos', id }]
    }),
    uploadVideo: builder.mutation<VideoDto, FormData>({
      query: (body) => ({ url: '/videos', method: 'POST', body }),
      invalidatesTags: ['Videos']
    })
  })
});

export const { useVideosQuery, useVideoQuery, useUploadVideoMutation } = videosApi;
