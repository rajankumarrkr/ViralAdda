import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(32).optional(),
    profileImage: z.string().optional()
  })
});
