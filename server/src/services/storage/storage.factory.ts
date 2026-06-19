import type { StorageProvider } from './storage.interface.js';
import { TelegramStorageProvider } from './telegram/telegram.provider.js';

let storageProvider: StorageProvider | undefined;

export const getStorageProvider = () => {
  if (!storageProvider) {
    storageProvider = new TelegramStorageProvider();
  }

  return storageProvider;
};
