import type { CommentDto, PaginatedResponse } from '@viraladda/shared-types';
import { baseApi } from '../baseApi';

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    comments: builder.query<PaginatedResponse<CommentDto>, string>({
      query: (videoId) => `/comments/${videoId}`,
      providesTags: ['Comments']
    }),
    addComment: builder.mutation<CommentDto, { videoId: string; comment: string }>({
      query: (body) => ({ url: '/comments', method: 'POST', body }),
      invalidatesTags: ['Comments', 'Videos']
    })
  })
});

export const { useCommentsQuery, useAddCommentMutation } = commentsApi;
