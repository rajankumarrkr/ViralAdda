# Telegram Storage

Telegram media storage is isolated to:

```text
server/src/services/storage/telegram/
```

No frontend code may import or reference Telegram Bot API details. Mobile and admin clients communicate only with server REST endpoints.

## Flow

```text
Client upload
  -> Server REST API
  -> StorageProvider interface
  -> TelegramStorageProvider
  -> Private Telegram channel
  -> Telegram file_id
  -> MongoDB metadata record
```

## Files

- `storage.interface.ts` defines the storage contract.
- `storage.factory.ts` provides the active storage provider.
- `telegram/telegram.provider.ts` adapts Telegram helpers to the storage contract.
- `telegram/upload-video.ts` uploads videos through `process.env.BOT_TOKEN` and `process.env.CHANNEL_ID`.
- `telegram/upload-image.ts` uploads images through `process.env.BOT_TOKEN` and `process.env.CHANNEL_ID`.
- `telegram/get-file-url.ts` resolves playable file URLs.
- `telegram/delete-media.ts` keeps delete behavior explicit. Telegram Bot API does not support deletion by `file_id`.

## Environment

Required server variables:

```env
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
CHANNEL_ID=-1003930411842
```

Startup validation throws `BOT_TOKEN is required` or `CHANNEL_ID is required` if either value is missing.
