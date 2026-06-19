import { baseApi } from '../baseApi';

export const likesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    likeVideo: builder.mutation<{ liked: true }, string>({
      query: (videoId) => ({ url: '/likes', method: 'POST', body: { videoId } }),
      invalidatesTags: ['Videos']
    }),
    unlikeVideo: builder.mutation<{ liked: false }, string>({
      query: (videoId) => ({ url: '/likes', method: 'DELETE', body: { videoId } }),
      invalidatesTags: ['Videos']
    })
  })
});

export const { useLikeVideoMutation, useUnlikeVideoMutation } = likesApi;
