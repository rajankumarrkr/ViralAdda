import { VIDEO_STATUS } from '@viraladda/constants';
import type { SortOrder } from 'mongoose';
import { getPagination } from '../../helpers/pagination.js';
import { VideoModel } from './video.model.js';

export const videoRepository = {
  async list(query: { page?: string; limit?: string; search?: string; category?: string; sort?: string; includePending?: boolean }) {
    const { page, limit, skip } = getPagination(query.page, query.limit);
    const filter: Record<string, unknown> = query.includePending ? {} : { status: VIDEO_STATUS.APPROVED };
    if (query.category) filter.category = query.category;
    if (query.search) filter.$text = { $search: query.search };

    const sort: Record<string, SortOrder> =
      query.sort === 'trending' ? { views: -1, likesCount: -1, createdAt: -1 } : { createdAt: -1 };
    const [data, total] = await Promise.all([
      VideoModel.find(filter).populate('uploadedBy', 'username profileImage').sort(sort).skip(skip).limit(limit),
      VideoModel.countDocuments(filter)
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  },

  findById(id: string) {
    return VideoModel.findById(id).populate('uploadedBy', 'username profileImage');
  }
};
