import { getPagination } from '../../helpers/pagination.js';
import { VideoModel } from '../videos/video.model.js';
import { CommentModel } from './comment.model.js';

export const commentRepository = {
  findVideo(videoId: string) {
    return VideoModel.findById(videoId);
  },

  create(input: { videoId: string; userId: string; comment: string }) {
    return CommentModel.create(input);
  },

  incrementCommentCount(videoId: string) {
    return VideoModel.findByIdAndUpdate(videoId, { $inc: { commentsCount: 1 } });
  },

  async list(videoId: string, query: any) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const [data, total] = await Promise.all([
      CommentModel.find({ videoId }).populate('userId', 'username profileImage').sort({ createdAt: -1 }).skip(skip).limit(limit),
      CommentModel.countDocuments({ videoId })
    ]);

    return { data, page, limit, total, totalPages: Math.ceil(total / limit) };
  }
};
