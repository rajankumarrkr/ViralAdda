import { VIDEO_STATUS, type VideoStatus } from '@viraladda/constants';
import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const videoSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, trim: true, maxlength: 2000 },
    category: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
    telegramFileId: { type: String, required: true },
    telegramThumbnailId: { type: String },
    storageProvider: { type: String, default: 'telegram' },
    duration: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    status: { type: String, enum: Object.values(VIDEO_STATUS), default: VIDEO_STATUS.PENDING satisfies VideoStatus }
  },
  { timestamps: true }
);

videoSchema.index({ title: 'text', description: 'text', category: 'text' });

export type VideoDocument = InferSchemaType<typeof videoSchema> & { _id: mongoose.Types.ObjectId };
export const VideoModel = mongoose.model('Video', videoSchema);
