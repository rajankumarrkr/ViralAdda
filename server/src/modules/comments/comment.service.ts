import { AppError } from '../../utils/AppError.js';
import { commentRepository } from './comment.repository.js';

export const commentService = {
  async create(input: { videoId: string; comment: string }, userId: string) {
    const video = await commentRepository.findVideo(input.videoId);
    if (!video) throw new AppError('Video not found', 404);

    const comment = await commentRepository.create({ ...input, userId });
    await commentRepository.incrementCommentCount(input.videoId);
    return comment.populate('userId', 'username profileImage');
  },

  async list(videoId: string, query: any) {
    return commentRepository.list(videoId, query);
  }
};
