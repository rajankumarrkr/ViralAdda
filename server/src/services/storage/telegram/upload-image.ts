import FormData from 'form-data';
import { env } from '../../../config/env.js';
import { telegramClient } from '../../../config/telegram.js';
import { AppError } from '../../../utils/AppError.js';

export const uploadImageToTelegram = async (file: Express.Multer.File) => {
  const form = new FormData();
  form.append('chat_id', env.CHANNEL_ID);
  form.append('photo', file.buffer, { filename: file.originalname, contentType: file.mimetype });

  const { data } = await telegramClient.post('/sendPhoto', form, { headers: form.getHeaders() });
  const photos = data?.result?.photo;
  const fileId = Array.isArray(photos) ? photos.at(-1)?.file_id : undefined;
  if (!fileId) throw new AppError('Telegram did not return an image file_id', 502);

  return fileId as string;
};
