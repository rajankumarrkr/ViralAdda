import { z } from 'zod';

export const likeSchema = z.object({
  body: z.object({
    videoId: z.string().min(1)
  })
});
