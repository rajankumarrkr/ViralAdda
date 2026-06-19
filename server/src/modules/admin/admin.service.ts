import { VIDEO_STATUS } from '@viraladda/constants';
import { CommentModel } from '../comments/comment.model.js';
import { UserModel } from '../users/user.model.js';
import { VideoModel } from '../videos/video.model.js';
import { CategoryModel } from '../categories/category.model.js';

export const adminService = {
  async dashboard() {
    const [totalUsers, totalVideos, totalComments, views] = await Promise.all([
      UserModel.countDocuments(),
      VideoModel.countDocuments(),
      CommentModel.countDocuments(),
      VideoModel.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }])
    ]);
    return { totalUsers, totalVideos, totalComments, totalViews: views[0]?.total ?? 0 };
  },

  users() {
    return UserModel.find().sort({ createdAt: -1 });
  },

  videos() {
    return VideoModel.find().populate('uploadedBy', 'username email').sort({ createdAt: -1 });
  },

  setVideoStatus(id: string, status: string) {
    return VideoModel.findByIdAndUpdate(id, { status }, { new: true });
  },

  blockUser(id: string, isBlocked: boolean) {
    return UserModel.findByIdAndUpdate(id, { isBlocked }, { new: true });
  },

  deleteUser(id: string) {
    return UserModel.findByIdAndDelete(id);
  },

  deleteVideo(id: string) {
    return VideoModel.findByIdAndDelete(id);
  },

  categories() {
    return CategoryModel.find().sort({ name: 1 });
  },

  createCategory(input: { name: string }) {
    const slug = input.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return CategoryModel.create({ name: input.name, slug });
  },

  updateCategory(id: string, input: { name: string }) {
    const slug = input.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return CategoryModel.findByIdAndUpdate(id, { name: input.name, slug }, { new: true });
  },

  deleteCategory(id: string) {
    return CategoryModel.findByIdAndDelete(id);
  },

  analytics() {
    return VideoModel.find({ status: VIDEO_STATUS.APPROVED }).sort({ views: -1 }).limit(10).populate('uploadedBy', 'username');
  }
};
