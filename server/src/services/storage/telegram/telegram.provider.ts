import type { StorageProvider } from '../storage.interface.js';
import { deleteTelegramMedia } from './delete-media.js';
import { getTelegramFileUrl } from './get-file-url.js';
import { uploadImageToTelegram } from './upload-image.js';
import { uploadVideoToTelegram } from './upload-video.js';

export class TelegramStorageProvider implements StorageProvider {
  async uploadVideo(file: Express.Multer.File) {
    return { fileId: await uploadVideoToTelegram(file) };
  }

  async uploadImage(file: Express.Multer.File) {
    return { fileId: await uploadImageToTelegram(file) };
  }

  getFileUrl(fileId: string) {
    return getTelegramFileUrl(fileId);
  }

  deleteMedia(fileId: string) {
    return deleteTelegramMedia(fileId);
  }
}
