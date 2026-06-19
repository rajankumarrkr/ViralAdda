import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { adminService } from './admin.service.js';

export const adminController = {
  dashboard: asyncHandler(async (_req: Request, res: Response) => res.json(await adminService.dashboard())),
  users: asyncHandler(async (_req: Request, res: Response) => res.json(await adminService.users())),
  videos: asyncHandler(async (_req: Request, res: Response) => res.json(await adminService.videos())),
  approveVideo: asyncHandler(async (req: Request, res: Response) => res.json(await adminService.setVideoStatus(String(req.params.id), 'approved'))),
  rejectVideo: asyncHandler(async (req: Request, res: Response) => res.json(await adminService.setVideoStatus(String(req.params.id), 'rejected'))),
  deleteVideo: asyncHandler(async (req: Request, res: Response) => res.json(await adminService.deleteVideo(String(req.params.id)))),
  blockUser: asyncHandler(async (req: Request, res: Response) => res.json(await adminService.blockUser(String(req.params.id), true))),
  unblockUser: asyncHandler(async (req: Request, res: Response) => res.json(await adminService.blockUser(String(req.params.id), false))),
  deleteUser: asyncHandler(async (req: Request, res: Response) => res.json(await adminService.deleteUser(String(req.params.id)))),
  categories: asyncHandler(async (_req: Request, res: Response) => res.json(await adminService.categories())),
  createCategory: asyncHandler(async (req: Request, res: Response) => res.status(201).json(await adminService.createCategory(req.body))),
  updateCategory: asyncHandler(async (req: Request, res: Response) => res.json(await adminService.updateCategory(String(req.params.id), req.body))),
  deleteCategory: asyncHandler(async (req: Request, res: Response) => res.json(await adminService.deleteCategory(String(req.params.id)))),
  analytics: asyncHandler(async (_req: Request, res: Response) => res.json(await adminService.analytics()))
};
