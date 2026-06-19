import { z } from 'zod';

export const createCommentSchema = z.object({
  body: z.object({
    videoId: z.string().min(1),
    comment: z.string().min(1).max(500)
  })
});

export const listCommentsSchema = z.object({
  params: z.object({ videoId: z.string().min(1) }),
  query: z.object({ page: z.string().optional(), limit: z.string().optional() })
});
