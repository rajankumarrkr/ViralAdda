import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { commentController } from './comment.controller.js';
import { createCommentSchema, listCommentsSchema } from './comment.validator.js';

export const commentRoutes = Router();

commentRoutes.post('/', authMiddleware, validate(createCommentSchema), commentController.create);
commentRoutes.get('/:videoId', validate(listCommentsSchema), commentController.list);
