import axios from 'axios';
import { env } from './env.js';

export const telegramClient = axios.create({
  baseURL: `https://api.telegram.org/bot${env.BOT_TOKEN}`,
  timeout: 120000
});

export const telegramFileBaseUrl = `https://api.telegram.org/file/bot${env.BOT_TOKEN}`;
