import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { authService } from './auth.service.js';

export const authController = {
  register: asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json(await authService.register(req.body));
  }),
  login: asyncHandler(async (req: Request, res: Response) => {
    res.json(await authService.login(req.body));
  }),
  refresh: asyncHandler(async (req: Request, res: Response) => {
    res.json(await authService.refresh(req.body.refreshToken));
  }),
  me: asyncHandler(async (req: Request, res: Response) => {
    res.json(await authService.me(req.user!.id));
  }),
  forgotPassword: asyncHandler(async (req: Request, res: Response) => {
    res.json(await authService.forgotPassword(req.body.email));
  })
};
