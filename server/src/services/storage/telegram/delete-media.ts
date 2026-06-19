// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deleteTelegramMedia = async (_fileId: string) => {
  // Telegram Bot API does not expose delete-by-file-id. Delete database references instead.
  return { deleted: false, reason: 'Telegram file deletion by file_id is not supported' };
};
