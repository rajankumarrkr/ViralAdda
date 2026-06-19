import { telegramClient } from './src/config/telegram.js';
import { env } from './src/config/env.js';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

async function test() {
  console.log('Testing Telegram Bot...');
  let botConnected = false;
  let channelConnected = false;
  let botError = null;
  let channelError = null;

  try {
    const { data: botData } = await telegramClient.get('/getMe');
    if (botData.ok) {
      botConnected = true;
      console.log('Bot Connected:', botData.result.username);
    }
  } catch (error: any) {
    botError = error.response?.data?.description || error.message;
    console.error('Bot Error:', botError);
  }

  try {
    const { data: chatData } = await telegramClient.get('/getChat', { params: { chat_id: env.CHANNEL_ID } });
    if (chatData.ok) {
      channelConnected = true;
      console.log('Channel Connected:', chatData.result.title);
    }
  } catch (error: any) {
    channelError = error.response?.data?.description || error.message;
    console.error('Channel Error:', channelError);
  }

  if (botConnected && channelConnected) {
    console.log('Testing Upload...');
    try {
      const form = new FormData();
      form.append('chat_id', env.CHANNEL_ID);
      
      // Create dummy image
      const imagePath = path.resolve('dummy.png');
      fs.writeFileSync(imagePath, Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64'));
      
      form.append('photo', fs.createReadStream(imagePath), { filename: 'dummy.png', contentType: 'image/png' });

      const { data } = await telegramClient.post('/sendPhoto', form, { headers: form.getHeaders() });
      if (data.ok) {
        const photos = data.result.photo;
        const file = photos.at(-1);
        console.log('Upload Success!');
        console.log('fileId:', file?.file_id);
        console.log('fileUniqueId:', file?.file_unique_id);
      }
    } catch (error: any) {
      console.error('Upload Error:', error.response?.data?.description || error.message);
    }
  }
}

test();
