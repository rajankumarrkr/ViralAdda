import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { commentService } from './comment.service.js';

export const commentController = {
  create: asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json(await commentService.create(req.body, req.user!.id));
  }),
  list: asyncHandler(async (req: Request, res: Response) => {
    res.json(await commentService.list(String(req.params.videoId), req.query));
  })
};
