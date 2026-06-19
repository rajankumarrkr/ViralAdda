export interface StorageUploadResult {
  fileId: string;
}

export interface StorageProvider {
  uploadVideo(file: Express.Multer.File): Promise<StorageUploadResult>;
  uploadImage(file: Express.Multer.File): Promise<StorageUploadResult>;
  getFileUrl(fileId: string): Promise<string>;
  deleteMedia(fileId: string): Promise<{ deleted: boolean; reason?: string }>;
}
