import { z } from 'zod';

export const listVideosSchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    search: z.string().optional(),
    category: z.string().optional(),
    sort: z.enum(['latest', 'trending']).optional()
  })
});

export const videoIdSchema = z.object({ params: z.object({ id: z.string().min(1) }) });

export const createVideoSchema = z.object({
  body: z.object({
    title: z.string().min(2).max(120),
    description: z.string().max(2000).optional(),
    category: z.string().optional(),
    duration: z.coerce.number().optional()
  })
});

export const updateVideoSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    title: z.string().min(2).max(120).optional(),
    description: z.string().max(2000).optional(),
    category: z.string().optional(),
    duration: z.coerce.number().optional()
  })
});
