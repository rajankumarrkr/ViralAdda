import { Router } from 'express';
import { USER_ROLES } from '@viraladda/constants';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { requireRole } from '../../middlewares/role.middleware.js';
import { adminController } from './admin.controller.js';

export const adminRoutes = Router();

adminRoutes.use(authMiddleware, requireRole(USER_ROLES.ADMIN));
adminRoutes.get('/dashboard', adminController.dashboard);
adminRoutes.get('/users', adminController.users);
adminRoutes.patch('/users/:id/block', adminController.blockUser);
adminRoutes.patch('/users/:id/unblock', adminController.unblockUser);
adminRoutes.delete('/users/:id', adminController.deleteUser);
adminRoutes.get('/videos', adminController.videos);
adminRoutes.patch('/videos/:id/approve', adminController.approveVideo);
adminRoutes.patch('/videos/:id/reject', adminController.rejectVideo);
adminRoutes.delete('/videos/:id', adminController.deleteVideo);
adminRoutes.get('/categories', adminController.categories);
adminRoutes.post('/categories', adminController.createCategory);
adminRoutes.put('/categories/:id', adminController.updateCategory);
adminRoutes.delete('/categories/:id', adminController.deleteCategory);
adminRoutes.get('/analytics', adminController.analytics);
