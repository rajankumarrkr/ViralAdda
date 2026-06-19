import type { Request, Response } from 'express';
import { USER_ROLES } from '@viraladda/constants';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { videoService } from './video.service.js';

export const videoController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    res.json(await videoService.list(req.query));
  }),
  search: asyncHandler(async (req: Request, res: Response) => {
    res.json(await videoService.search(String(req.query.q || ''), req.query));
  }),
  get: asyncHandler(async (req: Request, res: Response) => {
    res.json(await videoService.getById(String(req.params.id), req.user?.id));
  }),
  play: asyncHandler(async (req: Request, res: Response) => {
    res.json(await videoService.play(String(req.params.id)));
  }),
  create: asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json(await videoService.create(req.body, req.user!.id, req.files as any));
  }),
  update: asyncHandler(async (req: Request, res: Response) => {
    res.json(await videoService.update(String(req.params.id), req.body, req.user!.id, req.user!.role === USER_ROLES.ADMIN));
  }),
  remove: asyncHandler(async (req: Request, res: Response) => {
    res.json(await videoService.remove(String(req.params.id), req.user!.id, req.user!.role === USER_ROLES.ADMIN));
  })
};
