import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { likeService } from './like.service.js';

export const likeController = {
  like: asyncHandler(async (req: Request, res: Response) => {
    res.json(await likeService.like(req.body.videoId, req.user!.id));
  }),
  unlike: asyncHandler(async (req: Request, res: Response) => {
    res.json(await likeService.unlike(req.body.videoId, req.user!.id));
  })
};
