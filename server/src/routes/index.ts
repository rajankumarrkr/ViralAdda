import { Router } from 'express';
import { adminRoutes } from '../modules/admin/admin.routes.js';
import { authRoutes } from '../modules/auth/auth.routes.js';
import { categoryRoutes } from '../modules/categories/category.routes.js';
import { commentRoutes } from '../modules/comments/comment.routes.js';
import { likeRoutes } from '../modules/likes/like.routes.js';
import { notificationRoutes } from '../modules/notifications/notification.routes.js';
import { userRoutes } from '../modules/users/user.routes.js';
import { videoRoutes } from '../modules/videos/video.routes.js';
import { testRoutes } from '../modules/test/test.routes.js';

export const apiRoutes = Router();

apiRoutes.use('/auth', authRoutes);
apiRoutes.use('/videos', videoRoutes);
apiRoutes.use('/comments', commentRoutes);
apiRoutes.use('/likes', likeRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/users', userRoutes);
apiRoutes.use('/notifications', notificationRoutes);
apiRoutes.use('/admin', adminRoutes);
apiRoutes.use('/test', testRoutes);
