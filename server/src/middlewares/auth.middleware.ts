import type { NextFunction, Request, Response } from 'express';
import { UserModel } from '../modules/users/user.model.js';
import { AppError } from '../utils/AppError.js';
import { verifyAccessToken } from '../utils/jwt.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
    if (!token) throw new AppError('Authentication token is required', 401);

    const payload = verifyAccessToken(token);
    const user = await UserModel.findById(payload.sub).select('_id role isBlocked');
    if (!user || user.isBlocked) throw new AppError('User is not authorized', 401);

    req.user = { id: user.id, role: user.role };
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};
