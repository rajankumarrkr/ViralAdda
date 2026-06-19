import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { upload } from '../../middlewares/upload.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { createVideoSchema, listVideosSchema, updateVideoSchema, videoIdSchema } from './video.validator.js';
import { videoController } from './video.controller.js';

export const videoRoutes = Router();

videoRoutes.get('/', validate(listVideosSchema), videoController.list);
videoRoutes.get('/search', videoController.search);
videoRoutes.get('/:id', validate(videoIdSchema), videoController.get);
videoRoutes.get('/:id/play', validate(videoIdSchema), videoController.play);
videoRoutes.post(
  '/',
  authMiddleware,
  upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]),
  validate(createVideoSchema),
  videoController.create
);
videoRoutes.put('/:id', authMiddleware, validate(updateVideoSchema), videoController.update);
videoRoutes.delete('/:id', authMiddleware, validate(videoIdSchema), videoController.remove);
