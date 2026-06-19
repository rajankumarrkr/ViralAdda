import { LikeModel } from '../likes/like.model.js';
import { VideoModel } from '../videos/video.model.js';
import { WatchHistoryModel } from '../watch-history/watchHistory.model.js';
import { UserModel } from './user.model.js';

export const userRepository = {
  findById(userId: string) {
    return UserModel.findById(userId);
  },

  updateById(userId: string, input: Record<string, unknown>) {
    return UserModel.findByIdAndUpdate(userId, input, { new: true });
  },

  uploadedVideos(userId: string) {
    return VideoModel.find({ uploadedBy: userId }).sort({ createdAt: -1 });
  },

  likesByUser(userId: string) {
    return LikeModel.find({ userId }).select('videoId');
  },

  videosByIds(ids: unknown[]) {
    return VideoModel.find({ _id: { $in: ids } }).sort({ createdAt: -1 });
  },

  watchHistory(userId: string) {
    return WatchHistoryModel.find({ userId }).populate('videoId').sort({ watchedAt: -1 }).limit(100);
  }
};
