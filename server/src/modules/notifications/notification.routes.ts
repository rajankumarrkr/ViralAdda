import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { NotificationModel } from './notification.model.js';

export const notificationRoutes = Router();

notificationRoutes.use(authMiddleware);
notificationRoutes.get(
  '/',
  asyncHandler(async (req, res) => {
    res.json(await NotificationModel.find({ userId: req.user!.id }).sort({ createdAt: -1 }).limit(50));
  })
);
notificationRoutes.patch(
  '/:id/read',
  asyncHandler(async (req, res) => {
    res.json(await NotificationModel.findOneAndUpdate({ _id: req.params.id, userId: req.user!.id }, { isRead: true }, { new: true }));
  })
);
