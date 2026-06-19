import FormData from 'form-data';
import { env } from '../../../config/env.js';
import { telegramClient } from '../../../config/telegram.js';
import { AppError } from '../../../utils/AppError.js';

export const uploadVideoToTelegram = async (file: Express.Multer.File) => {
  const form = new FormData();
  form.append('chat_id', env.CHANNEL_ID);
  form.append('video', file.buffer, { filename: file.originalname, contentType: file.mimetype });

  const { data } = await telegramClient.post('/sendVideo', form, { headers: form.getHeaders() });
  const fileId = data?.result?.video?.file_id;
  if (!fileId) throw new AppError('Telegram did not return a video file_id', 502);

  return fileId as string;
};
