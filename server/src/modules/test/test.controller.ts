import { Request, Response } from 'express';
import FormData from 'form-data';
import { env } from '../../config/env.js';
import { telegramClient } from '../../config/telegram.js';

export const testTelegramConnection = async (req: Request, res: Response) => {
  let botConnected = false;
  let channelConnected = false;
  let botError = null;
  let channelError = null;

  try {
    const { data: botData } = await telegramClient.get('/getMe');
    if (botData.ok) {
      botConnected = true;
    }
  } catch (error: any) {
    botError = error.response?.data?.description || error.message;
  }

  try {
    const { data: chatData } = await telegramClient.get('/getChat', { params: { chat_id: env.CHANNEL_ID } });
    if (chatData.ok) {
      channelConnected = true;
    }
  } catch (error: any) {
    channelError = error.response?.data?.description || error.message;
  }

  res.json({
    success: true,
    botConnected,
    channelConnected,
    diagnostics: {
      botError,
      channelError,
      channelId: env.CHANNEL_ID
    }
  });
};

export const testTelegramUpload = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image uploaded' });
    }

    const form = new FormData();
    form.append('chat_id', env.CHANNEL_ID);
    form.append('photo', req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });

    const { data } = await telegramClient.post('/sendPhoto', form, { headers: form.getHeaders() });
    
    if (data.ok) {
      const photos = data.result.photo;
      const file = photos.at(-1);
      res.json({
        success: true,
        fileId: file?.file_id,
        fileUniqueId: file?.file_unique_id
      });
    } else {
      res.status(500).json({ success: false, error: 'Upload failed', details: data });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.response?.data?.description || error.message
    });
  }
};
