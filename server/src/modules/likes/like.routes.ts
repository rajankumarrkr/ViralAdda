import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { likeController } from './like.controller.js';
import { likeSchema } from './like.validator.js';

export const likeRoutes = Router();

likeRoutes.post('/', authMiddleware, validate(likeSchema), likeController.like);
likeRoutes.delete('/', authMiddleware, validate(likeSchema), likeController.unlike);
