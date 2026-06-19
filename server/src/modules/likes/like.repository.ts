import { VideoModel } from '../videos/video.model.js';
import { LikeModel } from './like.model.js';

export const likeRepository = {
  findVideo(videoId: string) {
    return VideoModel.findById(videoId);
  },

  findLike(videoId: string, userId: string) {
    return LikeModel.findOne({ videoId, userId });
  },

  create(videoId: string, userId: string) {
    return LikeModel.create({ videoId, userId });
  },

  delete(videoId: string, userId: string) {
    return LikeModel.findOneAndDelete({ videoId, userId });
  },

  increment(videoId: string, amount: number) {
    return VideoModel.findByIdAndUpdate(videoId, { $inc: { likesCount: amount } });
  }
};
