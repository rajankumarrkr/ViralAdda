import type { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { categoryService } from './category.service.js';

export const categoryController = {
  list: asyncHandler(async (_req: Request, res: Response) => {
    res.json(await categoryService.list());
  })
};
