import { VIDEO_STATUS } from '@viraladda/constants';
import { getStorageProvider } from '../../services/storage/index.js';
import { AppError } from '../../utils/AppError.js';
import { WatchHistoryModel } from '../watch-history/watchHistory.model.js';
import { VideoModel } from './video.model.js';
import { videoRepository } from './video.repository.js';

const storage = getStorageProvider();

const withMediaUrls = async (video: any) => {
  const object = video.toObject ? video.toObject() : video;
  return {
    ...object,
    id: object._id,
    playbackUrl: await storage.getFileUrl(object.telegramFileId),
    thumbnailUrl: object.telegramThumbnailId ? await storage.getFileUrl(object.telegramThumbnailId) : undefined
  };
};

export const videoService = {
  async list(query: any) {
    const result = await videoRepository.list(query);
    return {
      ...result,
      data: await Promise.all(result.data.map(withMediaUrls))
    };
  },

  async search(q: string, query: any) {
    const result = await videoRepository.list({ ...query, search: q });
    return {
      ...result,
      data: await Promise.all(result.data.map(withMediaUrls))
    };
  },

  async play(id: string) {
    const video = await videoRepository.findById(id);
    if (!video) throw new AppError('Video not found', 404);
    if (video.status !== VIDEO_STATUS.APPROVED) throw new AppError('Video is not available', 404);
    
    const playbackUrl = await storage.getFileUrl(video.telegramFileId);
    return { playbackUrl };
  },

  async getById(id: string, userId?: string) {
    const video = await videoRepository.findById(id);
    if (!video) throw new AppError('Video not found', 404);
    if (video.status !== VIDEO_STATUS.APPROVED) throw new AppError('Video is not available', 404);

    await VideoModel.findByIdAndUpdate(id, { $inc: { views: 1 } });
    if (userId) {
      await WatchHistoryModel.findOneAndUpdate({ userId, videoId: id }, { watchedAt: new Date() }, { upsert: true });
    }
    return withMediaUrls(video);
  },

  async create(input: any, userId: string, files: { video?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] }) {
    const videoFile = files.video?.[0];
    if (!videoFile) throw new AppError('Video file is required', 400);

    const { fileId: telegramFileId } = await storage.uploadVideo(videoFile);
    const thumbnail = files.thumbnail?.[0] ? await storage.uploadImage(files.thumbnail[0]) : undefined;
    const telegramThumbnailId = thumbnail?.fileId;
    const video = await VideoModel.create({ ...input, uploadedBy: userId, telegramFileId, telegramThumbnailId });
    return withMediaUrls(video);
  },

  async update(id: string, input: any, userId: string, isAdmin: boolean) {
    const video = await VideoModel.findById(id);
    if (!video) throw new AppError('Video not found', 404);
    if (!isAdmin && String(video.uploadedBy) !== userId) throw new AppError('You cannot update this video', 403);

    Object.assign(video, input);
    await video.save();
    return withMediaUrls(video);
  },

  async remove(id: string, userId: string, isAdmin: boolean) {
    const video = await VideoModel.findById(id);
    if (!video) throw new AppError('Video not found', 404);
    if (!isAdmin && String(video.uploadedBy) !== userId) throw new AppError('You cannot delete this video', 403);
    await video.deleteOne();
    return { success: true };
  }
};
