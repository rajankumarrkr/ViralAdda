import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const watchHistorySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  videoId: { type: Schema.Types.ObjectId, ref: 'Video', required: true, index: true },
  watchedAt: { type: Date, default: Date.now }
});

watchHistorySchema.index({ userId: 1, videoId: 1 });

export type WatchHistoryDocument = InferSchemaType<typeof watchHistorySchema> & { _id: mongoose.Types.ObjectId };
export const WatchHistoryModel = mongoose.model('WatchHistory', watchHistorySchema);
