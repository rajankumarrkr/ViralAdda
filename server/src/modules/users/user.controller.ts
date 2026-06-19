import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { userService } from './user.service.js';

export const userController = {
  profile: asyncHandler(async (req: Request, res: Response) => {
    res.json(await userService.profile(req.user!.id));
  }),
  updateProfile: asyncHandler(async (req: Request, res: Response) => {
    res.json(await userService.updateProfile(req.user!.id, req.body));
  }),
  uploadedVideos: asyncHandler(async (req: Request, res: Response) => {
    res.json(await userService.uploadedVideos(req.user!.id));
  }),
  likedVideos: asyncHandler(async (req: Request, res: Response) => {
    res.json(await userService.likedVideos(req.user!.id));
  }),
  watchHistory: asyncHandler(async (req: Request, res: Response) => {
    res.json(await userService.watchHistory(req.user!.id));
  })
};
