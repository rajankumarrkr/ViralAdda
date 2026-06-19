import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/AppError.js';

export const requireRole = (...roles: string[]) => (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('Insufficient permissions', 403));
  }
  return next();
};
