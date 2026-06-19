import { telegramClient, telegramFileBaseUrl } from '../../../config/telegram.js';
import { AppError } from '../../../utils/AppError.js';

export const getTelegramFileUrl = async (fileId: string) => {
  const { data } = await telegramClient.get('/getFile', { params: { file_id: fileId } });
  const filePath = data?.result?.file_path;
  if (!filePath) throw new AppError('Telegram file path was not found', 404);

  return `${telegramFileBaseUrl}/${filePath}`;
};
