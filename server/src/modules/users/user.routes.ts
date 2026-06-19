import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { userController } from './user.controller.js';
import { updateProfileSchema } from './user.validator.js';

export const userRoutes = Router();

userRoutes.use(authMiddleware);
userRoutes.get('/profile', userController.profile);
userRoutes.put('/profile', validate(updateProfileSchema), userController.updateProfile);
userRoutes.get('/videos', userController.uploadedVideos);
userRoutes.get('/liked-videos', userController.likedVideos);
userRoutes.get('/watch-history', userController.watchHistory);
