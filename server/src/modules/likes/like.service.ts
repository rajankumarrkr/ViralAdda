import { AppError } from '../../utils/AppError.js';
import { likeRepository } from './like.repository.js';

export const likeService = {
  async like(videoId: string, userId: string) {
    const video = await likeRepository.findVideo(videoId);
    if (!video) throw new AppError('Video not found', 404);

    const existing = await likeRepository.findLike(videoId, userId);
    if (!existing) {
      await likeRepository.create(videoId, userId);
      await likeRepository.increment(videoId, 1);
    }
    return { liked: true };
  },

  async unlike(videoId: string, userId: string) {
    const removed = await likeRepository.delete(videoId, userId);
    if (removed) await likeRepository.increment(videoId, -1);
    return { liked: false };
  }
};
